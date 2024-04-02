import { getToken } from "./users-service";

// URL: the HTTP request send to
// method: HTTP request method
// payload: data payload send with request
export default async function sendRequest(url, method = "GET", payload = null) {
  //1.Setting up headers and body based on payload

  // options - object , method - property(coming from sendRequest(method params))
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
