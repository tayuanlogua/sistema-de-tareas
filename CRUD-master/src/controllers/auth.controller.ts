import { Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

/**
 * Interface for defining the structure of a user.
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
 * Controller function to handle user registration.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} The response containing user data or error message.
 */
export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email is already in use"]);

    const passwordHash = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);

    return res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Controller function to handle user login.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} The response containing user data or error message.
 */
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { password, email } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Controller function to handle user logout.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} The response indicating successful logout or error message.
 */
export const logout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    res.clearCookie("token");
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Controller function to fetch user profile.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} The response containing user profile data or error message.
 */
export const profile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userFound = await User.findById(req.user?.id);
    if (!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Controller function to verify user token.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} The response indicating successful token verification or error message.
 */
export const verifyToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err: any, user: any) => {
    if (err)
      return res.status(401).json({ message: "Unauthorized", error: err });
    const userFound = await User.findById(user?.id);
    if (!userFound) return;
    return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
