import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { logger, buildResponse } from "../utils";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { randomBytes } from "crypto";

const sm = new SecretsManagerClient({ region: "us-east-1" });
const command = new GetSecretValueCommand({
  SecretId: "admin_password",
});

// Generate a secure random token for the admin session
function generateAdminToken(): string {
  return randomBytes(32).toString("hex");
}

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const origin = event.headers?.origin || event.headers?.Origin || "";
    const body = JSON.parse(event.body) || "{}";
    logger.info({ message: "Received body", body });

    const { password } = body;

    if (!password) {
      return buildResponse(400, { message: "password is required" }, origin);
    }

    const secret = await sm.send(command);
    const storedPassword = JSON.parse(secret.SecretString).password;

    if (password === storedPassword) {
      // Generate a secure admin token
      const adminToken = generateAdminToken();

      // Set cookie expiration to 24 hours from now
      const expires = new Date();
      expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);

      // Check if request is from localhost
      const origin = event.headers?.origin || event.headers?.Origin || "";
      const host = event.headers?.host || event.headers?.Host || "";
      const isLocalhost =
        origin.includes("localhost") ||
        origin.includes("127.0.0.1") ||
        host.includes("localhost") ||
        host.includes("127.0.0.1");

      // Build response with http-only cookie
      const response = buildResponse(200, { message: "Password is valid" }, origin);

      // Set the http-only admin cookie
      // HttpOnly prevents JavaScript access, Secure ensures HTTPS only (skip for localhost), SameSite prevents CSRF
      const secureFlag = isLocalhost ? " " : "Secure; ";
      const sameSiteFlag = isLocalhost ? "SameSite=Strict;" : "SameSite=None;";
      response.headers["Set-Cookie"] = `admin_session=${adminToken}; HttpOnly; ${secureFlag}${sameSiteFlag} Path=/; Expires=${expires.toUTCString()}`;

      return response;
    } else {
      return buildResponse(401, { message: "Incorrect password" }, origin);
    }
  } catch (e) {
    logger.error(e);
    return buildResponse(500, { message: "Failed to validate password" }, origin);
  }
};
