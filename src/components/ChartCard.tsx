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
    date: string
};

export default function ChartCard({ label, color, title, keys, date }: Props) {
    const { data, loading } = useAppSelector(selectHistoricData);

    const reversedArray = useMemo(() => [...data].reverse(), [data]);
    const index = useMemo(() => reversedArray.findIndex((item) => item.date === date), [reversedArray, date]);

    const labels: string[] = useMemo(() => (
        reversedArray.slice(index - 30, index).reduce((acc: string[], item) => [...acc, item.date], [])
    ), [index, reversedArray]);

    const dataset: number[] = useMemo(() => (
        reversedArray.slice(index - 30, index).reduce((acc: number[], item) => [...acc, getNestedValue(item, keys).value], [])
    ), [index, reversedArray, keys]);

    if(loading) return <></>;

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
                <div>
                    <h6>Population %</h6>
                    <p>{getNestedValue(reversedArray[index], keys).calculated.population_percent?.toLocaleString('US')}%</p>
                </div>
                <div>
                    <h6>Daily change</h6>
                    <p>{getNestedValue(reversedArray[index], keys).calculated.change_from_prior_day?.toLocaleString('US')}</p>
                </div>
                <div>
                    <h6>Weekly change %</h6>
                    <p>{getNestedValue(reversedArray[index], keys).calculated.seven_day_change_percent?.toLocaleString('US')}%</p>
                </div>
                {/outcomes/.test(keys) &&
                <div>
                    <h6>Weekly average</h6>
                    <p>{parseInt(((getNestedValue(reversedArray[index], keys).calculated.seven_day_average - getNestedValue(reversedArray[index - 7], keys).calculated.seven_day_average) / 7).toFixed(0)).toLocaleString('US')}</p>
                </div>
                }
            </div>
        </section>
    )
};