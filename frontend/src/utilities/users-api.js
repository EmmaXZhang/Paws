// BASE URL for backend API (backend route)

import sendRequest from "./send-request";

const BASE_URL = "/api/users";

//return token !
export function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

// return token
export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
