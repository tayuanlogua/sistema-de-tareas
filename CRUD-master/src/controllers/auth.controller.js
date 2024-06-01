"use strict";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

/**
 * Registers a new user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email is already in use"]);

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // Save the user to the database
    const userSaved = await newUser.save();

    // Create access token
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);

    // Respond with user information for the frontend
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Logs in a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    // Check if the user exists
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // Compare the password
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    // Create access token
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);

    // Respond with user information for the frontend
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Logs out a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

/**
 * Gets the profile of the authenticated user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

/**
 * Verifies the access token.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
