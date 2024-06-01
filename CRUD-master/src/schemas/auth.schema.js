"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");

/**
 * Schema for registering a new user.
 */
exports.registerSchema = zod_1.z.object({
  username: zod_1.z.string({
    required_error: "Username is required",
  }),
  email: zod_1.z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email format",
    }),
  password: zod_1.z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});

/**
 * Schema for user login.
 */
exports.loginSchema = zod_1.z.object({
  email: zod_1.z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email format",
    }),
  password: zod_1.z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});
