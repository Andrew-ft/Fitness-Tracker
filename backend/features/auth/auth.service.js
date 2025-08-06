import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

const registerUser = async (fullName, email, password, role) => {
  // checking if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // checking password
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  // hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // creating a new user
  const roleMember = Role.member;
  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      role: role || roleMember,
    },
  });
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
