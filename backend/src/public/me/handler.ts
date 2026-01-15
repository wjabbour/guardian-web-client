import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { logger, buildResponse } from "../utils";

export const handler = async (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const origin = event.headers?.origin || event.headers?.Origin || "";
        // Check for admin_session cookie in the request
        const cookies = event.headers?.Cookie || event.headers?.cookie || "";
        const hasAdminSession = cookies.includes("admin_session=");

        // If admin_session cookie exists, user is admin, otherwise user
        const role = hasAdminSession ? "admin" : "user";

        logger.info({ message: "User role determined", role, hasAdminSession });

        return buildResponse(200, { role }, origin);
    } catch (e) {
        logger.error(e);
        const origin = event.headers?.origin || event.headers?.Origin || "";
        return buildResponse(500, { message: "Failed to get user info", role: "user" }, origin);
    }
};
