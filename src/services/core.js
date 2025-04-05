/**
 * @version 0.0.1
 * Updated On : 5 Apr, 2025
 * Code API configuration
 */
import axios from "axios";
import toast from "react-hot-toast";

/**
 * Axios API instance with the base url from env config
 */
export const axiosApi = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Handles the API response
 * @param {promise} api_call
 * @param {string|boolean} toast_success
 * @param {string|boolean} toast_loading
 * @returns response data or null and show error / success alerts.
 */
export const responseHandler = async (
  api_call,
  toast_success,
  toast_loading
) => {
  let response = null;
  // If loading and success message is provided then show promise toast message.
  const toastId = toast;
  if (toast_loading) toast.loading(toast_loading, { id: toastId });
  try {
    response = await api_call;
    if (toast_success) toast.success(toast_success, { id: toastId });
  } catch (e) {
    response = e;
  }

  // Handle success / error response
  if (response?.status == 200) return response.data;
  else if (response?.status == 201) return response.data;
  else if (response?.status == 400)
    toast.error(response?.response?.data?.message, {
      id: toastId,
    });
  else if (response?.status == 404)
    toast.error(response.response.data.message, {
      id: toastId,
    });
  // eslint-disable-next-line no-dupe-else-if
  else if (response?.status == 404)
    toast.error(response.response.data.message, {
      id: toastId,
    });
  else if (response?.status == 409)
    toast.error(
      `Unauthorized 401 : ${
        response?.response?.data?.message
          ? response?.response?.data?.message
          : "Action is not permitted."
      }`,
      { id: toastId }
    );
  else if (response?.status == 403)
    toast.error("Unauthorized 403 : Action forbidden.", { id: toastId });
  else if (response?.status === 500)
    toast.error("Error 500 : " + response?.message, { id: toastId });
  else
    toast.error("Error : Something went wrong. Please contact admin.", {
      id: toastId,
    });
  return null;
};

export const getToken = async () => {
  const session = localStorage.getItem("userSession")
    ? JSON.parse(localStorage.getItem("userSession"))
    : null;

  let response = session?.token;

  return response;
};

export const parseMongoId = (id) => {
  if (!id) return "";
  return parseInt(`${id.substring(0, 4)}${id.substring(20)}`, 16).toString();
};

export function toCapitalized(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

