import express from "express";
import userService from "./userService.js";

const userController = {
  login: (req, res) => {
    return res.json({ msg: "login" });
  },

  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const user = await userService.registerUser({
        name,
        email,
        password,
        role,
      });
      return res.status(201).json({
        msg: "User created successfully",
        user,
      });
    } catch (e) {
      console.error("Error creating user:", e.message);
      return res.status(400).json({ error: e.message });
    }
  },
};

export default userController;
