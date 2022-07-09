import React from 'react';
// Assets
import { Loading } from '../assets';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

type Props = {
    type: 'dailyData' | 'historicData'
    children: React.ReactNode | React.ReactNode[]
}

export default function Layout({ children, type }: Props) {
    const data = useSelector((state: RootState) => state[type]);

    if (data.loading) return (
        <div id="layout">
            <img src={Loading} alt="loading" className='loader' />
            <p>Loading...</p>
        </div>
    );

    return (
        <div id="layout">
            {children}
        </div>
    )
};