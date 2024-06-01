"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * Mongoose schema for user data.
 * @const userSchema
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose_1.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensures that each email is unique in the database
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);
/**
 * Mongoose model for the User schema.
 * @const User
 * @type {mongoose.Model<User>}
 */
const User = mongoose_1.model("User", userSchema);
exports.default = User;
