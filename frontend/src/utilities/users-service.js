import * as usersAPI from "./users-api";

export async function signUp(userData) {
  //server send back hashed token based on userData
  const res = await usersAPI.signUp(userData);
  //save token in localstorage
  localStorage.setItem("token", res.token);
  //get user
  return getUser();
}

export function LogOut() {
  //remove token from local storage
  localStorage.removeItem("token");
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem("token", token.token);
  return getUser();
}

export function getToken() {
  //distract token from local storage
  const token = localStorage.getItem("token");
  if (!token) return null;

  //extract token from payload
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // if token expire, remove it
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      return null;
    }
  } catch (e) {
    console.log(e);
  }

  return token;
}

export function getUser() {
  const token = getToken();
  //.user refer to users.js payload define -> jwt.sign() key
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function checkToken() {
  return usersAPI.checkToken().then((dateStr) => new Date(dateStr));
}
