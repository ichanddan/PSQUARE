/**
 * @version 0.0.1
 * Updated On : Apr 5, 2025
 * APIs related to Authentication
 */

import { axiosApi, getToken, responseHandler } from "../core";

export const Candidate = {
  Add:  async(data, toast_success = false, toast_loading = false) => {
    const token = await getToken()
    const api_call = axiosApi.post("/candidate/add", data, {
      headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${token}` },
    });
    return responseHandler(api_call, toast_success, toast_loading);
  },
  getAll: async ( toast_success = false, toast_loading = false) => {
    const token = await getToken()
    const api_call = axiosApi.get("/candidate/get-all",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseHandler(api_call, toast_success, toast_loading);
  },
  DeleteCandidate: async ( id, toast_success = false, toast_loading = false) => {
    const token = await getToken()
    const api_call = axiosApi.delete(`/candidate/delete/${id}`,{headers: {
      Authorization: `Bearer ${token}`,
    },});
    return responseHandler(api_call, toast_success, toast_loading);
  },
};
