"use strict";
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

/**
 * Creates a new access token.
 * @param {object} payload - Payload to be included in the token.
 * @returns {Promise<string>} The generated access token.
 */
function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
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

module.exports = { createAccessToken };
