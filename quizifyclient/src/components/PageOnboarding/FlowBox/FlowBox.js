import React, { Component } from 'react';
import {ButtonForwards, ButtonBack} from './ButtonArrow';
import ProgressCircles from './ProgressCircles/ProgressCircles';
import './FlowBox.css'

class FlowBox extends Component {
    render() {
        return (
            <div className="FlowBox">
                {this.props.selected !== this.props.num - 1 ? <div className="ButtonArrow ButtonForwards" onClick={() => this.props.clickHandler('next')}><ButtonForwards /></div> : null}
                {this.props.selected !== 0 ? <div className="ButtonArrow ButtonBack" onClick={() => this.props.clickHandler('prev')}><ButtonBack /></div> : null }
                <div className="ProgCircles"><ProgressCircles num={this.props.num} selected={this.props.selected}/></div>
                <div className="Contents">{this.props.children}</div>
            </div>
        );
    }
}

export default FlowBox;