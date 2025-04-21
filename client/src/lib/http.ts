import axios from "axios";
import { getConfigValue } from "./config";

function handleError(e, error_message?) {
  const message =
    e.response?.data.message ||
    error_message ||
    "Unexpected error. Please try again.";
  if (e.response) {
    return { success: null, error: { message, status: e.response.status } };
  } else {
    return { success: null, error: { message, status: 500 } };
  }
}

export async function create_order(order) {
  const body = { ...order, companyName: getConfigValue("title") };

  try {
    const response = await axios.post(
      `${getConfigValue("server_hostname")}/v1/create-order`,
      body
    );
    return { success: { data: response.data }, error: null };
  } catch (e) {
    return handleError(e);
  }
}

export async function retrieve_orders() {
  const body = { companyName: getConfigValue("title") };
  try {
    const response = await axios.post(
      `${getConfigValue("server_hostname")}/v1/retrieve-orders`,
      body
    );
    return { success: { data: response.data }, error: null };
  } catch (e) {
    return handleError(e);
  }
}

export async function capture_order(order_id) {
  const body = { order_id, companyName: getConfigValue("title") };

  try {
    const response = await axios.post(
      `${getConfigValue("server_hostname")}/v1/capture-order`,
      body
    );
    return { success: { data: response.data }, error: null };
  } catch (e) {
    return handleError(e);
  }
}

export async function update_historical_order(email, created_at, cart) {
  const body = { email, created_at: created_at + "", cart };

  try {
    const response = await axios.post(
      `${getConfigValue("server_hostname")}/v1/update-historical-order`,
      body
    );
    return { success: { data: response.data }, error: null };
  } catch (e) {
    return handleError(e);
  }
}
