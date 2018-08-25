import React, { Component } from 'react';
import './ProgressCircles.css'

class ProgressCircles extends Component {
    renderDots = () => {
        const dots = []
            for (var i = 0; i < this.props.num; i++) {
                if(i === this.props.selected) {
                    dots.push(<span className="dot selected" key={i}></span>);
                } else {
                    dots.push(<span className="dot" key={i}></span>);
                }
            }
        return dots;
    }
    
    render() {
        return (
            <div>
                {this.renderDots()}
            </div>
        );
    }
}

export default ProgressCircles;