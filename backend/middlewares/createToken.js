import express from "express";
import jwt from "jsonwebtoken";


const maxTime = 1 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET , { expiresIn: maxTime });
};

export default createToken;