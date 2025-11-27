import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

const registerUser = async (userName, email, password, role) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userRole = Object.values(Role).includes(role) ? role : Role.MEMBER;
  const user = await prisma.user.create({
    data: {
      userName,
      email,
      password: hashedPassword,
      role: userRole,
    },
  });
  if (userRole === Role.ADMIN) {
    await prisma.admin.create({ data: { adminId: user.userId } });
  } else if (userRole === Role.TRAINER) {
    await prisma.trainer.create({
      data: {
        trainerId: user.userId,
        certificate: "",
        specialization: "",
        experiencedYears: 0,
        clientTypes: ""
      }
    });
  } else if (userRole === Role.MEMBER) { 
    await prisma.member.create({
      data: {
        memberId: user.userId,
        goal: "",
        medicalNotes: "",
        trainerId: null,
      },
    });
  }
  
  console.log("New user created successfully");
  return user;
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new Error("Invalid password");
    }
    return user;
};

const resetPassword = async (email, oldPassword, newPassword) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordValid) {
    throw new Error("Old password is incorrect");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedNewPassword },
  });

  return { message: "Password updated successfully" };
}

const authService = {
  registerUser,
  loginUser,
  resetPassword,
};

export default authService;
