export const checkValidity = (value, rules) => {
    let isValid = true
    if (rules.required) {
        isValid = isValid && value.trim() !== ''
    }
    if (rules.minLength) {
        isValid = isValid && value.trim().length >= rules.minLength
    }
    if (rules.maxLength) {
        isValid = isValid && value.trim().length <= rules.maxLength
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = isValid && pattern.test(value)
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = isValid && pattern.test(value)
    }
    return isValid
}