import React from 'react';
import { animated, Spring } from 'react-spring';
import PropTypes from 'prop-types';

/**
 * Wrapper for show/hide/answer animations on Track objects
 */
const AnimatedTrackWrapper = props => (
    // first spring for controlling opacity
    <Spring
        native
        delay={props.isAnswer ? 0 : props.delay}
        from={{
            opacity: 0
        }}
        to={props.show ? { opacity: 1 } : { opacity: 0 }}
    >
        {({ opacity }) => (
            // second spring for controlling position
            <Spring
                native
                reset={!props.isAnswer && !props.show}
                delay={props.isAnswer && props.show ? 1000 : 0}
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
