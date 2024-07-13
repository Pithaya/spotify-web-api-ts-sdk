export function validateLength<T>(
    valueName: string,
    value: T[],
    min: number,
    max: number
): void {
    if (!tryValidateLength(value, min, max)) {
        throw new Error(
            `${valueName} must have between ${min} and ${max} items`
        );
    }
}

export function tryValidateLength<T>(
    value: T[],
    min: number,
    max: number
): boolean {
    return tryValidateNumber(value.length, min, max);
}

export function validateNumber(
    valueName: string,
    value: number | undefined,
    min: number,
    max: number
): void {
    if (!tryValidateNumber(value, min, max)) {
        throw new Error(`${valueName} must be between ${min} and ${max}`);
    }
}

export function tryValidateNumber(
    value: number | undefined,
    min: number,
    max: number
): boolean {
    if (value === undefined) {
        return true;
    }

    return value >= min && value <= max;
}
