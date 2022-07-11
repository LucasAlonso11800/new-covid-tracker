import React, { useEffect } from 'react';
// Styles
import './App.scss';
// Components
import { CardsContainer, Layout } from './components';
// Redux
import { useAppDispatch, useAppSelector } from './state/store';
import { getHistoricData, selectHistoricData } from './state/features/historicData/historicDataSlice';
import { getDailyData, selectDailyData } from './state/features/dailyData/dailyDataSlice';

export default function App() {
    const dispatch = useAppDispatch();
    const historicData = useAppSelector(selectHistoricData)
    const dailyData = useAppSelector(selectDailyData)

    useEffect(() => {
        dispatch(getHistoricData())
        dispatch(getDailyData('2021-01-02'))
    }, [dispatch])

    useEffect(() => {
        console.log('historic', historicData.loading, historicData.data, historicData.error)
    }, [historicData]);

    useEffect(() => {
        console.log('daily', dailyData.loading, dailyData.data, dailyData.error)
    }, [dailyData])

    return (
        <Layout type="historicData">
            <main>
                <CardsContainer type='historicData'/>
            </main>
        </Layout>
    );
}