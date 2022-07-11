import React, { useEffect, useState } from 'react';
// Styles
import './App.scss';
// Components
import { CardsContainer, ChartCard, WelcomeModal } from './components';
// Redux
import { useAppDispatch, useAppSelector } from './state/store';
import { getHistoricData, selectHistoricData } from './state/features/historicData/historicDataSlice';
// Assets
import { Loading } from './assets';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function App() {
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector(selectHistoricData);

    const [date, setDate] = useState<string>('2021-03-07');

    useEffect(() => {
        dispatch(getHistoricData())
    }, [dispatch]);

    const validationSchema = yup.object({
        date: yup.date().max('2021-03-07', 'Maximum date is 2021/03/07').min('2020-01-12', 'Minimum date is 2020/01/12').required('Please select a date')
    });

    const formik = useFormik({
        initialValues: {
            date: '2021-03-07'
        },
        validationSchema,
        onSubmit: (values) => setDate(values.date)
    });

    useEffect(() => {
        formik.submitForm()
    }, [formik.values.date])



    if (loading) return (
        <main>
            <WelcomeModal />
            <img src={Loading} alt="loading" className='loader' />
            <p>Loading...</p>
        </main>
    );

    if (error) return (
        <main>
            <p>{error}</p>
        </main>
    );

    return (
        <main>
            <WelcomeModal />
            <CardsContainer />
            <div className="input-container">
                <label htmlFor="date">Select a date:</label>
                <input type="date" id="date" value={formik.values.date} onChange={formik.handleChange} />
                <p>{formik.errors.date}</p>
            </div>
            <ChartCard
                label="Cases"
                title='Cases in the previous month'
                color='#54c9f7'
                keys='cases.total'
                date={date}
            />
            <ChartCard
                label="Tests"
                title='Tests in the previous month'
                color='#41a63d'
                keys='testing.total'
                date={date}
            />
            <ChartCard
                label="Hospitalized"
                title='Hospitalizations in the previous month '
                color='#ed7915'
                keys='outcomes.hospitalized.currently'
                date={date}
            />
            <ChartCard
                label="Deaths"
                title='Deaths in the previous month'
                color='#fc3f6c'
                keys='outcomes.death.total'
                date={date}
            />
        </main>
    );
}