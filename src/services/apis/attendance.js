/**
 * @version 0.0.1
 * Updated On : Apr 6, 2025
 * APIs related to Authentication
 */

import { axiosApi, responseHandler } from "../core";

export const Attendance = {
  AddAttendance: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post("/attendance/add", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return responseHandler(api_call, toast_success, toast_loading);
  },
  getAllAttendance: (toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.get("/attendance/get");
    return responseHandler(api_call, toast_success, toast_loading);
  },
  UpdateAttendance: (id, data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.put(`/attendance/update/${id}`, data);
    return responseHandler(api_call, toast_success, toast_loading);
  },
};
