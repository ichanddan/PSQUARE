/**
 * @version 0.0.1
 * Updated On : Apr 5, 2025
 * Import and export apis from ./apis
 * Import it in component as API.Login()
 */

import { Attendance } from "./apis/attendance";
import { AuthApi } from "./apis/auth";
import { Candidate } from "./apis/candidate";
import { Employee } from "./apis/employee";
import { Leave } from "./apis/leave";

export const API = {
  ...AuthApi,
  ...Candidate,
  ...Employee,
  ...Leave,
  ...Attendance
};
