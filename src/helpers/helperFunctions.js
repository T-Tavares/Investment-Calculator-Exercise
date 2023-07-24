export function convertToCurrency(value) {
    return new Intl.NumberFormat().format(value);
}

export function uniqueID() {
    return +`${Math.random()}`.slice(2);
}
