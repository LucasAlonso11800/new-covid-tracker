import React, { useEffect } from 'react';
import './App.scss';
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
    }, [])

    useEffect(() => {
      console.log('historic', historicData.loading, historicData.data, historicData.error)
    }, [historicData]);

    useEffect(() => {
      console.log('daily', dailyData.loading, dailyData.data, dailyData.error)
    }, [dailyData])
    
    return (
        <main>
        </main>
    );
}