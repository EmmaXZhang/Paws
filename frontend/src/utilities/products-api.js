import sendRequest from "./send-request";
const BASE_URL = "/api/products";

// export function createProduct(productData) {
//   return sendRequest(BASE_URL + "/new", "POST", productData, true);
// }

export function getProducts() {
  let url = BASE_URL;
  return sendRequest(url, "GET");
}

// export function deleteJournal(journalId) {
//   return sendRequest(`${BASE_URL}/${journalId}`, "DELETE");
// }

export function getOneProduct(productId) {
  return sendRequest(`${BASE_URL}/${productId}`, "GET");
}

// export function updateJournal(updateJournal) {
//   return sendRequest(`${BASE_URL}/${updateJournal._id}`, "PUT", updateJournal);
// }
