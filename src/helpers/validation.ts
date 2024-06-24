export const nameRules = [
    (value: string) => {
        if(greaterThan(value, 0) && lettersOnly(value))
            return true;

        return 'Field cannot be empty and needs only letters'
    }
]

export const textRules = [
    (value: string) => {
        if(greaterThan(value, 0))
            return true;

        return 'Field cannot be empty'
    }
]

export const phoneNumberRules = [
    (value: string) => {
        if(greaterThan(value, 8) && numbersOnly(value))
            return true;
            

        return 'Phone number needs to be at least 9 digits';
    }
]

export const emailRules = [
    (value: string) => {
        if(emailValidation(value))
            return true;

        return 'Email is not valid'
    }
]

export const expenseValueRules = [
    (value: string) => {
        if(numbersOnly(value) && greaterThan(value, 0))
            return true;

        return 'Input needs only numbers'
    }
]


const numbersOnly = (value: string): boolean => {
    return /^[0-9]+$/.test(value);
}

const lettersOnly = (value: string): boolean => {
    return /^[a-zA-Z]+$/.test(value);
}

const greaterThan = (value: string, limit: number) => {
    return value.length > limit;
}

const emailValidation = (value: string): boolean => {
    return /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)
}

const selectRequired = (value: string): boolean => {
    return value ? true : false
}

//buttons validation
export const minOneChar = (val: string): boolean => {
    return val.length > 0
}