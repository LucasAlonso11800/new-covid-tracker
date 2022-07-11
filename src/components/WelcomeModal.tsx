import React from 'react';
// Redux
import { useAppDispatch, useAppSelector } from '../state/store';
import { closeModal, selectWelcomeModal } from '../state/features/welcomeModal/welcomeModalSlice';

export default function WelcomeModal() {
    const dispatch = useAppDispatch();
    const handleClick = () => dispatch(closeModal());

    const isOpen = useAppSelector(selectWelcomeModal);

    return (
        <div id="welcome-modal" className={isOpen ? 'open' : 'closed'} data-testid="welcome-modal">
            <div className="modal-content">
                <p>Welcome to the Covid US Statistics Dashboard built by Lucas Alonso.</p>
                <p>This web app is built with React, Typescript, SASS and Redux Toolkit. Tested with React Testing Library</p>
                <p>The dates when data is available go from to 2020/01/12 to 2021/03/07.</p>
                <button onClick={handleClick}>Go to dashboard</button>
            </div>
        </div>
    )
};