import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../components/Button/Button';
import Answer from '../screens/PageApp/Answer/Answer';
import GradientBackground from '../components/GradientBackground/GradientBackground';

import { SAMPLE_TRACKS } from '../util/mockData';
import '../index.css';

// add gradient background to all stories
addDecorator(story => <GradientBackground>{story()}</GradientBackground>);

storiesOf('Button', module).add('basic', () => (
    <Button onClick={action('clicked')}>Basic Button</Button>
));

storiesOf('Answer', module).add('Correct', () => (
    <Answer correctAnswer={true} correctTrack={SAMPLE_TRACKS[0]} />
));
