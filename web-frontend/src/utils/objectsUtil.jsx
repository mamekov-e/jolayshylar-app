export function hasValue(obj, propName, valueToCheck) {
  return obj[propName].includes(valueToCheck) ? true : false;
}

export function startsWithValue(obj, propName, valueToCheck) {
  return obj[propName].startsWith(valueToCheck) ? true : false;
}
