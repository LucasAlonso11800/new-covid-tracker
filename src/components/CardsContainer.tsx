import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { Card } from './';

type Props = {
    type: 'dailyData' | 'historicData'
};

export default function CardsContainer({ type }: Props) {
    const data = useSelector((state: RootState) => state[type]);

    if (!data.data) return <></>;

    const values = Array.isArray(data.data) ? data.data[0] : data.data;

    return (
        <section id="cards-container">
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