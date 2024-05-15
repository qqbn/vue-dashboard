export const nameRule = [
    (value: string) => (value.length > 0) || 'Field cannot be empty'
]


//buttons validation
export const minOneChar = (val: string): boolean => {
    return val.length > 0
}