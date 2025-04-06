/**
 * @version 0.0.1
 * Updated On : Apr 5, 2025
 * APIs related to Authentication
 */

import { axiosApi, getToken, responseHandler } from "../core";

export const Employee = {
  Add: async (data, toast_success = false, toast_loading = false) => {
    const token = await getToken()
    const api_call = axiosApi.post("/employs/add", data, {
      headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`  },
    });
    return responseHandler(api_call, toast_success, toast_loading);
  },
  UpdateEmployee: async (id,data, toast_success = false, toast_loading = false) => {
    const token = await getToken()
    const api_call = axiosApi.put("/employs/update/"+id, data, {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
    });
    return responseHandler(api_call, toast_success, toast_loading);
  },
  getAllEmployee: async (toast_success = false, toast_loading = false) => {
    const token = await getToken()
    const api_call = axiosApi.get("/employs/get-all-employs", {headers: {
      Authorization: `Bearer ${token}`,
    },});
    return responseHandler(api_call, toast_success, toast_loading);
  },
  DeleteEmployee: async (id,toast_success = false, toast_loading = false) => {
    const token = await getToken()
    const api_call = axiosApi.delete("/employs/delete/"+id ,{headers: {
      Authorization: `Bearer ${token}`,
    },});
    return responseHandler(api_call, toast_success, toast_loading);
  },
};
