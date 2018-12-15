import React from 'react';
import { Spring } from 'react-spring';

/**
 * Gives a component a fade-in transition.
 * Wraps it in a `react-spring` Spring with a specified delay.
 * Note that the wrapped component must be an `animated.*` component from react-spring.
 * @param {React.Component} WrappedComponent The component to fade in
 * @param {number} delay The fade-in delay in milliseconds
 */
function withDelayedFadeIn(WrappedComponent, delay) {
    return class extends React.Component {
        render() {
            return (
                <Spring
                    native
                    delay={delay}
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                >
                    {({ opacity }) => (
                        <WrappedComponent style={{ opacity }} {...this.props} />
                    )}
                </Spring>
            );
        }
    };
}

export default withDelayedFadeIn;
