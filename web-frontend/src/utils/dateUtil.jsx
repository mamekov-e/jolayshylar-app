const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC'
};

export function getCurrentDate() {
    return new Date().toLocaleString("ru", options)
}