import { getToken } from "./users-service";
// import axios from "axios";

export default async function sendRequest(url, method = "GET", payload = null) {
  const options = { method };
  // if payload provided, [header][body] used to configure the HTTP request
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }

  //2. Including token for authentication if there is
  const token = getToken();
  if (token) {
    // if token exist, options.headers remain unchange and prepared headers to include token for authentication
    options.headers = options.headers || {};
    //include the token using the Bearer authentication scheme.
    options.headers.Authorization = `Bearer ${token}`;
  }

  // Fetch accepts an options object as the 2nd argument
  const res = await fetch(url, options);

  // return ???? DEPEND ON what is the URL/route purpose
  if (res.ok) return res.json();
  throw new Error("Bad Request");
}

// export default async function sendRequest(url, method = "GET", payload = null) {
//   const config = {
//     method,
//     headers: {},
//   };

//   if (payload) {
//     config.headers["Content-Type"] = "application/json";
//     config.data = JSON.stringify(payload);
//   }

//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   try {
//     const response = await axios(url, config);
//     return response.data;
//   } catch (error) {
//     throw new Error("Bad Request");
//   }
// }
