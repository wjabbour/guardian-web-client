import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { logger, buildResponse } from "../utils";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const sm = new SecretsManagerClient({ region: "us-east-1" });
const command = new GetSecretValueCommand({
  SecretId: "admin_password",
});

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body) || "{}";
    logger.info({ message: "Received body", body });

    const { password } = body;

    if (!password) {
      return buildResponse(400, { message: "password is required" });
    }

    const secret = await sm.send(command);
    const storedPassword = JSON.parse(secret.SecretString).password;

    if (password === storedPassword) {
      return buildResponse(200, { message: "Password is valid" });
    } else {
      return buildResponse(401, { message: "Incorrect password" });
    }
  } catch (e) {
    logger.error(e);
    return buildResponse(500, { message: "Failed to validate password" });
  }
};
