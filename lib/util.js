
export function makeSerializable (o) {
  return JSON.parse(JSON.stringify(o))
}

export function convertEpoch (date) {
  const myDate = new Date(date * 1000)
  return myDate.toGMTString()
}
