
export function makeSerializable (o) {
    // console.log("o: "+ JSON.stringify(o))
    return JSON.parse(JSON.stringify(o))
}

export function convertEpoch (date) {
    var myDate = new Date(date *1000);
    return myDate.toGMTString();
}
