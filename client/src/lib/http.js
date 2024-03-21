import axios from 'axios';

function handleError(e, error_message) {
  const message = e.response?.data.message || error_message || 'Unexpected error. Please try again.';
  if (e.response) {
    return { success: null, error: { message, status: e.response.status } }
  } else {
    return { success: null, error: { message, status: 500 } }
  }
}

export async function create_order(order) {
  const body = { ...order }

  try {
    const response = await axios.post('https://o1yn7lpenj.execute-api.us-east-1.amazonaws.com/v1/create-order', body);
    return { success: { data: response.data }, error: null }
  } catch (e) {
    return handleError(e)
  }
}

export async function capture_order(order_id) {
  const body = { order_id }

  try {
    const response = await axios.post('https://o1yn7lpenj.execute-api.us-east-1.amazonaws.com/v1/capture-order', body);
    return { success: { data: response.data }, error: null }
  } catch (e) {
    return handleError(e)
  }
}