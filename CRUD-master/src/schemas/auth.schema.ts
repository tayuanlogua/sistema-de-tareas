import { z } from "zod";

/**
 * Schema for registering a new user.
 */
export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email format",
    }),
  password: z
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
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email format",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});
