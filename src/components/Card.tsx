import React from 'react';
import { Icon } from '@iconify/react';
// Types
import { Calculated, Cases } from '../types';

type Props = {
    image: string
    imageColor: string
    title: string
    values: Cases<Calculated>
}

export default function Card(props: Props) {
    const { image, imageColor, title, values } = props;

    return (
        <div className="card">
            <div className={`image-container ${title.toLowerCase()}`}>
                <Icon icon={image} color={imageColor} width="100%"/>
            </div>
            <div className="total">
                <h4>{title}</h4>
                <p>{values.value.toLocaleString('US')}</p>
            </div>
            <div className="info-row">
                <div>
                    <h6>Population %</h6>
                    <p>{values.calculated.population_percent.toLocaleString('US')}%</p>
                </div>
                <div>
                    <h6>Daily change</h6>
                    <p>{values.calculated.change_from_prior_day > 0 ? "+ " : ""}{values.calculated.change_from_prior_day.toLocaleString('US')}</p>
                </div>
                <div>
                    <h6>Weekly change</h6>
                    <p>{values.calculated.seven_day_change_percent.toLocaleString('US')}%</p>
                </div>
            </div>
        </div>
    )
};