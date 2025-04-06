/**
 * @version 0.0.1
 * Updated On : Apr 6, 2025
 * APIs related to Authentication
 */

import { axiosApi, getToken, responseHandler } from "../core";

export const Leave = {
  AddLeave: async (data, toast_success = false, toast_loading = false) => {
    const token = await getToken()
    const api_call = axiosApi.post("/leave/add", data, {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
    });
    return responseHandler(api_call, toast_success, toast_loading);
  },
  getAllLeave: async (toast_success = false, toast_loading = false) => {
    const token = await getToken()
    const api_call = axiosApi.get("/leave/getAll",{headers: {
      Authorization: `Bearer ${token}`,
    },});
    return responseHandler(api_call, toast_success, toast_loading);
  },
  UpdateLeave: async (id, data, toast_success = false, toast_loading = false) => {
    const token = await getToken()
    const api_call = axiosApi.put(`/leave/update-status/${id}`, data, {headers: {
      Authorization: `Bearer ${token}`,
    },});
    return responseHandler(api_call, toast_success, toast_loading);
  },
};
