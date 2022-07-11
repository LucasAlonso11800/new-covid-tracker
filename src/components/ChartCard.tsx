import React, { useMemo } from 'react'
import { generateDatasets, getNestedValue } from '../utils/charts-utils'
// Redux
import { useAppSelector } from '../state/store';
import { selectHistoricData } from '../state/features/historicData/historicDataSlice';
// Types
import { ResponseKeys } from '../types';
// Charts
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, BarController, BarElement, PointElement, LinearScale, Title, CategoryScale, } from 'chart.js';

ChartJS.register(BarController, BarElement, PointElement, LinearScale, Title, CategoryScale);

type Props = {
    label: string
    color: string
    title: string
    keys: ResponseKeys
};

export default function ChartCard({ label, color, title, keys }: Props) {
    const data = useAppSelector(selectHistoricData);
    
    const reversedArray = useMemo(() => [...data.data].reverse(), [data.data]);
    const index = useMemo(() => reversedArray.findIndex((item) => item.date === '2020-12-31'), [reversedArray]);

    const labels: string[] = useMemo(() => (
        reversedArray.slice(index - 30, index).reduce((acc: string[], item) => [...acc, item.date], [])
    ), [index]);

    const dataset: number[] = useMemo(() => (
        reversedArray.slice(index - 30, index).reduce((acc: number[], item) => [...acc, getNestedValue(item, keys)], [])
    ), [index]);

    return (
        <section className="chart-card">
            <Chart
                type='bar'
                data={{
                    labels,
                    datasets: [generateDatasets(label, dataset, color)]
                }}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: title,
                            position: "top",
                            align: "start",
                            color: '#000000',
                            font: { size: 16 },
                            padding: { bottom: 16 }
                        }
                    },
                    skipNull: true,
                }}
            />
            <div className="daily-data">
                <h4>Daily data</h4>
            </div>
        </section>
    )
};