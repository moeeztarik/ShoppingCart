export function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
export function getSumofArr(arr, key) {
  return arr.reduce(function (acc, obj) {
    return acc + (obj[key] || 0);
  }, 0);
}
