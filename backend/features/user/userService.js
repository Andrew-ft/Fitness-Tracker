import express from "express";
import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";

const userService = {
  registerUser: async ({ name, email, password, role }) => {
    const userExists = await prisma.user.findFirst({
      where: { email },
    });
    if (userExists) {
      console.log("user already exists");
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashValue = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashValue,
        role,
      },
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  },
};

export default userService;
