import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import CountdownBar from '../components/CountdownBar/CountdownBar';

const countdownStories = storiesOf('CountdownBar', module);
countdownStories.addDecorator(withKnobs);

countdownStories.add('Default', () => {
    const fraction = number('Fraction', 1, {
        range: true,
        min: 0,
        max: 1,
        step: 0.1
    });
    const show = boolean('Show', true);
    return <CountdownBar show={show} fraction={fraction} />;
});
