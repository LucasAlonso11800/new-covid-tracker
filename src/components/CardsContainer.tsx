import React from 'react'
// Redux
import { selectHistoricData } from '../state/features/historicData/historicDataSlice';
import { useAppSelector } from '../state/store';
// Components
import { Card } from './';

export default function CardsContainer() {
    const { data } = useAppSelector(selectHistoricData);
    if (!data) return <></>;

    const values = data[0];

    return (
        <section id="cards-container">
            <h1>Statistics for 2021/03/07, the last available date</h1>
            <Card
                title='Cases'
                values={values.cases.total}
                image="ic:baseline-query-stats"
                imageColor="#54c9f7"
            />
            <Card
                title='Tests'
                values={values.testing.total}
                image="bx:test-tube"
                imageColor="#41a63d"
            />
            <Card
                title='Hospitalized'
                values={values.outcomes.hospitalized.currently}
                image="healthicons:hospital-symbol"
                imageColor="#ed7915"
            />
            <Card
                title='Deaths'
                values={values.outcomes.death.total}
                image="healthicons:death-alt2"
                imageColor="#fc3f6c"
            />
        </section>
    )
};