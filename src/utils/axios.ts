import axios from "axios";

export const getHistoricData = async () => {
    const response: APIResponse<Response[]> = await (await axios.get('https://api.covidtracking.com/v2/us/daily.json')).data;
    return response.data
};

export const getDailyData = async (date: string) => {
    const response: APIResponse<Response> = await (await axios.get(`https://api.covidtracking.com/v2/us/daily/${date}.json`)).data;
    return response.data
};

type APIResponse<T> = {
    data: T
};

type Response = {
    date: string
    states: number
    cases: {
        total: Cases<Calculated>
    }
    testing: {
        total: Cases<Calculated>
    }
    outcomes: {
        hospitalized: {
            currently: Cases<CalculatedWithAVG>
            in_icu: {
                currently: Cases<CalculatedWithAVG>
            }
            on_ventilator: {
                currently: Cases<CalculatedWithAVG>
            }
        },
        death: {
            total: Cases<CalculatedWithAVG>
        }
    }
}

type Calculated = {
    population_percent: number
    change_from_prior_day: number
    seven_day_change_percent: number
};
type CalculatedWithAVG = {
    population_percent: number
    change_from_prior_day: number
    seven_day_change_percent: number
    seven_day_average: number
};

type Cases<T> = {
    value: number
    calculated: T
}
