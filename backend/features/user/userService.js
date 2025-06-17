import express from "express";
import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";

const userService = {
  registerUser: async ({ name, email, password, role }) => {
    const userExists = await prisma.user.findFirst({
      where: { email },
    });
    if (userExists) {
      console.log("User already exists");
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashValue = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashValue,
        role: role || "member",
      },
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      password: user.password,
      createdAt: user.createdAt,
    };
  },

  loginUser: async ({ email, password, role }) => {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new Error("User does not exits");
    }

    let isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      return user;
    } else {
      throw new Error("Password incorrect");
    }
  },

  getUserById: async (id) => {
    return prisma.user.findUnique({ where: { id } });
  },

  updateProfile: async (id, { name, email }) => {
    return prisma.user.update({ where: { id }, data: { name, email } });
  },

  changePassword: async (id, oldPass, newPass) => {
    const user = await prisma.user.findUnique({ where: { id } });
    const isValid = await bcrypt.compare(oldPass, user.password);
    if (!isValid) throw new Error("Incorrect Old Password");
    const hash = await bcrypt.hash(newPass, await bcrypt.genSalt(10));
    return prisma.user.update({ where: { id }, data: { password: hash } });
  },

  deleteUser: async (id) => {
    await prisma.user.delete({ where: { id } });
    return;
  },

  listUsers: async () => {
    return await prisma.user.findMany();
  },

  updateUserRole: async (id, role) => {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      throw new Error("User not found");
    }

    return prisma.user.update({
      where: { id: Number(id) },
      data: { role },
    });
  },
};

export default userService;
