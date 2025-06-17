import express from "express";
import userService from "./userService.js";
import createToken from "../../middlewares/createToken.js";

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const user = await userService.registerUser({
        name,
        email,
        password,
        role
      });
      const token = createToken(user.id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({
        msg: "User created successfully",
        user,
        token,
      });
    } catch (e) {
      console.error("Error creating user:", e.message);
      return res.status(400).json({ error: e.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userService.loginUser({ email, password });
      const token = createToken(user.id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({
        msg: "User login successfully",
        user,
        token,
      });
    } catch (e) {
      console.error("Error creating user:", e.message);
      return res.status(400).json({ error: e.message });
    }
  },

  logout: async (req, res) => {
    try {
      const user = req.user?.name || "User";
      res.cookie("jwt", {
        maxAge: 1,
      });
      return res.json({ message: `${user} logout successfully`  });
    } catch (e) {
      console.error("Error creating user:", e.message);
      return res.status(400).json({ error: e.message });
    }
  },

  me: async (req, res) => {
    res.json({ user: req.user });
  },

  updateProfile: async (req, res) => {
    const updated = await userService.updateProfile(req.user.id, req.body);
    res.json({ message: "Profile updated", user: updated });
  },

  changePassword: async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    await userService.changePassword(req.user.id, oldPassword, newPassword);
    res.json({ message: "Password updated successfuly" });
  },

  deleteAccount: async (req, res) => {
    await userService.deleteUser(req.user.id);
    res.clearCookie("jwt");
    res.json({ message: "Account deleted" });
  },

  listAll: async (req, res) => {
    const users = await userService.listUsers();
    res.json({ users });
  },

  promote: async (req, res) => {
    console.log("Promoting user ID:", req.params.id);
    const updated = await userService.updateUserRole(req.params.id, "trainer");
    res.json({ message: "User promoted to trainer", user: updated });
  },

  demote: async (req, res) => {
    const updated = await userService.updateUserRole(req.params.id, "member");
    res.json({ message: "User demoted to member", user: updated });
  }
};

export default userController;
