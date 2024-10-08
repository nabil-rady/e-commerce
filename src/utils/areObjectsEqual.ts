export default function areObjectsEqual(x: object, y: object) {
  return x && y && typeof x === "object" && typeof y === "object"
    ? Object.keys(x).length === Object.keys(y).length &&
        Object.keys(x).reduce(function (isEqual, key) {
          return isEqual && areObjectsEqual(x[key], y[key]);
        }, true)
    : x === y;
}
