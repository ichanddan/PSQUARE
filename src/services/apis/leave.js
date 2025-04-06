/**
 * @version 0.0.1
 * Updated On : Apr 6, 2025
 * APIs related to Authentication
 */

import { axiosApi, responseHandler } from "../core";

export const Leave = {
  AddLeave: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post("/leave/add", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return responseHandler(api_call, toast_success, toast_loading);
  },
  getAllLeave: (toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.get("/leave/getAll");
    return responseHandler(api_call, toast_success, toast_loading);
  },
  UpdateLeave: (id, data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.put(`/leave/update-status/${id}`, data);
    return responseHandler(api_call, toast_success, toast_loading);
  },
};
