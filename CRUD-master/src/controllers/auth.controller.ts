import { Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

/*
 * Interface representing a user in the database.
 */
interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Registers a new user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userFound = (await User.findOne({ email })) as IUser;
    if (userFound) return res.status(400).json(["The email is already in use"]);

    // Hash password
    const passwordHash = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // Save user to the database
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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Logs in a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const login = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  try {
    // Find user in the database
    const userFound = (await User.findOne({ email })) as IUser;
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcryptjs.compare(password, userFound.password);
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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Logs out a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

/**
 * Gets the profile of the authenticated user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const profile = async (req: Request, res: Response) => {
  const userFound = (await User.findById(req.user?.id)) as IUser;
  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

/**
 * Verifies the access token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err: any, user: any) => {
    if (err)
      return res.status(401).json({ message: "Unauthorized", error: err });
    const userFound = (await User.findById(user?.id)) as IUser;
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
