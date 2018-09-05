import React from 'react';
import { ButtonForwards, ButtonBack } from './ButtonArrow';
import ProgressCircles from './ProgressCircles/ProgressCircles';
import './FlowBox.css';

const FlowBox = props => (
    <div className="FlowBox">
        {props.selected !== props.num - 1 ? (
            <div
                className="ButtonArrow ButtonForwards"
                onClick={() => props.clickHandler('next')}
            >
                <ButtonForwards />
            </div>
        ) : null}
        {props.selected !== 0 ? (
            <div
                className="ButtonArrow ButtonBack"
                onClick={() => props.clickHandler('prev')}
            >
                <ButtonBack />
            </div>
        ) : null}
        <div className="ProgCircles">
            <ProgressCircles num={props.num} selected={props.selected} />
        </div>
        <div className="Contents">{props.children}</div>
    </div>
);

export default FlowBox;
