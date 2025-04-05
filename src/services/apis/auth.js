/**
 * @version 0.0.1
 * Updated On : Apr 5, 2025
 * APIs related to Authentication
 */

import { axiosApi, responseHandler } from "../core";

export const AuthApi = {
  Login: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post("/auth/login", data);
    return responseHandler(api_call, toast_success, toast_loading);
  },
};
