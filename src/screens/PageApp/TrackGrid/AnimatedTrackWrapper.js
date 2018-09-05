import React from 'react';
import { animated, Spring, config } from 'react-spring';
import PropTypes from 'prop-types';

/**
 * Wrapper for show/hide/answer animations on Track objects
 */
const AnimatedTrackWrapper = props => (
    // first spring for controlling opacity
    <Spring
        native
        delay={props.delay}
        from={{
            opacity: 0
        }}
        config={config.stiff}
        to={props.show ? { opacity: 1 } : { opacity: 0 }}
    >
        {({ opacity }) => (
            // second spring for controlling position
            <Spring
                native
                delay={800}
                from={{
                    transform: `translate3d(${props.position.x}px,${
                        props.position.y
                    }px,0) scale(1)`
                }}
                to={
                    props.isAnswer
                        ? {
                              transform: `translate3d(${150}px,${50}px,0) scale(1.5)`
                          }
                        : {}
                }
            >
                {({ transform }) => (
                    <animated.div style={{ opacity, transform }}>
                        {props.children}
                    </animated.div>
                )}
            </Spring>
        )}
    </Spring>
);

AnimatedTrackWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    delay: PropTypes.number.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }).isRequired,
    show: PropTypes.bool.isRequired,
    isAnswer: PropTypes.bool.isRequired
};

export default AnimatedTrackWrapper;
