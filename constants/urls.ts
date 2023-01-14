const BASE_URL = "https://upayments-studycase-api.herokuapp.com/api";
console.log(BASE_URL)

export const endpoints = {
  getProducts: `${BASE_URL}/products`,
  getCategories: `${BASE_URL}/categories`,
}