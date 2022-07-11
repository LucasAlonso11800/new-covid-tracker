import { CalculatedWithAVG, Cases, Response, ResponseKeys } from "../types";

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

export const getNestedValue = (item: Response, keys: ResponseKeys): Cases<CalculatedWithAVG> => {
    if (!item) return {
        value: 0,
        calculated: {
            change_from_prior_day: 0,
            population_percent: 0,
            seven_day_average: 0,
            seven_day_change_percent: 0
        }
    };
    
    const value: any = item;
    return keys.split('.').reduce((acc, key) => acc[key], value);
};