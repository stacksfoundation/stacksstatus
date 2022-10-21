
export function makeSerializable (o) {
    return JSON.parse(JSON.stringify(o))
}