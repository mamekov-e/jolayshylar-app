export function waitUntilNotNull(obj, field, callback) {
    if (obj[field] !== null || obj['link'] !== "#") {
        callback();
    } else {
        setTimeout(() => waitUntilNotNull(obj, field, callback), 500);
    }
}