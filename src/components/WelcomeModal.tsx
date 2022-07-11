import React from 'react';
// Redux
import { useAppDispatch, useAppSelector } from '../state/store';
import { closeModal, selectWelcomeModal } from '../state/features/welcomeModal/welcomeModalSlice';

export default function WelcomeModal() {
    const dispatch = useAppDispatch();
    const handleClick = () => dispatch(closeModal());

    const isOpen = useAppSelector(selectWelcomeModal);

    return (
        <div id="welcome-modal" className={isOpen ? 'open' : 'closed'}>
            <div className="modal-content">
                <p>Welcome to the Covid US Statistics Dashboard built by Lucas Alonso.</p>
                <p>This web app was built using React, Typescript, SASS and Redux Toolkit.</p>
                <p>The dates when data is available go from to 2020-01-13 to 2021-03-07.</p>
                <button onClick={handleClick}>Go to dashboard</button>
            </div>
        </div>
    )
};