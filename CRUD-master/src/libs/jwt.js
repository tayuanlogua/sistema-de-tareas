"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_js_1 = require("../config.js");

/**
 * Creates a new access token.
 * @param {object} payload - Payload to be included in the token.
 * @returns {Promise<string>} The generated access token.
 */
function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jsonwebtoken_1.default.sign(
      payload,
      config_js_1.TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
exports.createAccessToken = createAccessToken;
