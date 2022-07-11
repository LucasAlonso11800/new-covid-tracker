import { Response, ResponseKeys } from "../types";

export const generateDatasets = (label: string, data: number[], border: string) => {
    return ({
        label: label,
        data: data,
        fill: true,
        borderColor: border,
        borderWidth: 2,
        pointHitRadius: 10,
        tension: 0.2
    })
};

export const getNestedValue = (item: Response, keys: ResponseKeys): number => {
    const value: any = item;
    return keys.split('.').reduce((acc, key) => acc[key], value);      
};