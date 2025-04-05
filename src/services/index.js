/**
 * @version 0.0.1
 * Updated On : Apr 5, 2025
 * Import and export apis from ./apis
 * Import it in component as API.Login()
 */

import { AuthApi } from './apis/auth';
import { Candidate } from './apis/candidate';


export const API = {
  ...AuthApi,
  ...Candidate
};