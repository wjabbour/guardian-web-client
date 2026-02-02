import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { logger, buildResponse, handleOptionsRequest } from "../utils";
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
  // Handle OPTIONS preflight request
  const optionsResponse = handleOptionsRequest(event);
  if (optionsResponse) {
    return optionsResponse;
  }

  try {
    const origin = event.headers?.origin || event.headers?.Origin || "";
    const body = JSON.parse(event.body) || "{}";
    logger.info({ message: "Received body", body });

    const { password } = body;

    if (!password) {
      return await buildResponse(400, { message: "password is required" }, origin, event);
    }

    const secret = await sm.send(command);
    const storedPassword = JSON.parse(secret.SecretString).password;

    if (password !== storedPassword) {
      return await buildResponse(401, { message: "Incorrect password" }, origin, event);
    }

    // Generate a secure admin token
    const adminToken = generateAdminToken();

    // Set cookie expiration to 24 hours from now
    const expires = new Date();
    expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);

    // Build response with http-only cookie
    const response = await buildResponse(200, { message: "Password is valid" }, origin, event);

    response.headers["Set-Cookie"] = `admin_session=${adminToken}; HttpOnly; Secure; SameSite=None; Path=/; Expires=${expires.toUTCString()}`;
    return response;
  } catch (e) {
    logger.error(e);
    const origin = event.headers?.origin || event.headers?.Origin || "";
    return await buildResponse(500, { message: "Failed to validate password" }, origin, event);
  }
};
