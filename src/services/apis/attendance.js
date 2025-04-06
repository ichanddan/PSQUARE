/**
 * @version 0.0.1
 * Updated On : Apr 6, 2025
 * APIs related to Authentication
 */

import { axiosApi, getToken, responseHandler } from "../core";

export const Attendance = {
  AddAttendance: async (data, toast_success = false, toast_loading = false) => {
    const token = await getToken();
    const api_call = axiosApi.post("/attendance/add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return responseHandler(api_call, toast_success, toast_loading);
  },
  getAllAttendance: async (toast_success = false, toast_loading = false) => {
    const token = await getToken();
    const api_call = axiosApi.get("/attendance/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseHandler(api_call, toast_success, toast_loading);
  },
  UpdateAttendance: async (
    id,
    data,
    toast_success = false,
    toast_loading = false
  ) => {
    const token = await getToken();
    const api_call = axiosApi.put(`/attendance/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseHandler(api_call, toast_success, toast_loading);
  },
};
