import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

/**
 * Creates a new access token.
 * @param {object} payload - Payload to be included in the token.
 * @returns {Promise<string>} The generated access token.
 */
export function createAccessToken(payload: any): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err: Error | null, token: string | undefined) => {
        if (err) reject(err);
        resolve(token!);
      }
    );
  });
}
