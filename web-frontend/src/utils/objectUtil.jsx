export function waitUntilNotNull(obj, field, callback) {
    if (obj[field] !== null || obj['link'] !== "#") {
        callback();
    } else {
        setTimeout(() => waitUntilNotNull(obj, field, callback), 500);
    }
}

export function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
            return false;
        }
    }
    return true;
}