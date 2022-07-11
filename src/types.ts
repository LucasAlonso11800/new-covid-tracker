export type APIResponse<T> = {
    data: T
};

export type Response = {
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

export type Calculated = {
    population_percent: number
    change_from_prior_day: number
    seven_day_change_percent: number
};
export type CalculatedWithAVG = {
    population_percent: number
    change_from_prior_day: number
    seven_day_change_percent: number
    seven_day_average: number
};

export type Cases<T> = {
    value: number
    calculated: T
};

export type ResponseKeys = 
'cases.total' | 'testing.total' | 'outcomes.hospitalized.currently' | 'outcomes.death.total';