export function makeSerializable(o) {
  return JSON.parse(JSON.stringify(o));
}

export function convertEpoch(date) {
  const myDate = new Date(date * 1000);
  return myDate.toGMTString();
}

// pages/api/user
export async function getData(url) {
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData;
}
