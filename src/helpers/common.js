import axios from 'axios';

export function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
export function getSumofArr(arr, key) {
  return arr.reduce(function (acc, obj) {
    return acc + (obj[key] || 0);
  }, 0);
}

export async function mockApi() {
  const response = await axios.get("https://my-json-server.typicode.com/benirvingplt/products/products");
  return response.data[0].id;
}