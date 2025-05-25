export function arrayToRecord<T , K extends keyof T>(
    array: T[],
    key: K
): Record<string, T> {
    return array.reduce((acc, obj) => {
        const recordKey = String(obj[key]);
        acc[recordKey] = obj;
        return acc;
    }, {} as Record<string, T>);
}