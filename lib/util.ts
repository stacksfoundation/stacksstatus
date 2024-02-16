export const apiRoot = 'https://api.hiro.so';

export const millisecondsPerHour = 60 * 60 * 1000;
export const millisecondsPerDay = 24 * millisecondsPerHour;

export function makeSerializable(o) {
  return JSON.parse(JSON.stringify(o));
}

export const getTimestampFromNow = (milliseconds: number) => {
  const now = new Date();
  const oldTimestamp = new Date(now.getTime() - milliseconds).getTime();
  return oldTimestamp;
};

export function convertEpoch(date) {
  const myDate = new Date(date * 1000);
  return myDate.toUTCString();
}

export const isProd = process.env.NODE_ENV === 'production';

// pages/api/user
export async function getData(url) {
  const response = await fetch(url, { next: { revalidate: isProd ? 90 : 0 } });
  const jsonData = await response.json();
  return jsonData;
}
