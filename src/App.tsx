import React, { useEffect } from 'react';
// Styles
import './App.scss';
// Components
import { CardsContainer, Layout } from './components';
// Redux
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './state/store';
import { getHistoricData } from './state/features/historicData/historicDataSlice';
import { getDailyData } from './state/features/dailyData/dailyDataSlice';

export default function App() {
    const dispatch = useAppDispatch();
    const historicData = useSelector((state: RootState) => state.historicData);
    const dailyData = useSelector((state: RootState) => state.dailyData);

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