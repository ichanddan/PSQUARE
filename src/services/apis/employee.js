/**
 * @version 0.0.1
 * Updated On : Apr 5, 2025
 * APIs related to Authentication
 */

import { axiosApi, responseHandler } from "../core";

export const Employee = {
  Add: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post("/employs/add", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return responseHandler(api_call, toast_success, toast_loading);
  },
  UpdateEmployee: (id,data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.put("/employs/update/"+id, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return responseHandler(api_call, toast_success, toast_loading);
  },
  getAllEmployee: (toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.get("/employs/get-all-employs");
    return responseHandler(api_call, toast_success, toast_loading);
  },
  DeleteEmployee: (id,toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.delete("/employs/delete/"+id);
    return responseHandler(api_call, toast_success, toast_loading);
  },
};
