import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { animated } from 'react-spring';
import withDelayedFadeIn from '../../util/withDelayedFadeIn';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import Button from '../../components/Button/Button';
import { Text } from 'rebass';
import { WatermarkLogo } from '../../components/QuizifyLogo/QuizifyLogo';
import * as S from './styles';

const TextWithFadeIn = withDelayedFadeIn(S.ResultsText, 50);
const ShareButtonWithFadeIn = withDelayedFadeIn(animated.div, 2000);
const TryAgainButtonWithFadeIn = withDelayedFadeIn(S.TryAgain, 2250);

const share = score => {
    const shareText = `How well do you know your Spotify library? I just scored ${score} in Quizify!`;
    window.open(
        `http://twitter.com/share?text=${shareText}&url=https://quizify.app`
    );
};

class PageResults extends Component {
    render() {
        return (
            <div>
                <GradientBackground />
                <WatermarkLogo />
                <S.ResultsPageContents>
                    <TextWithFadeIn>
                        <S.ScoreTitle>
                            Your Quizify Score: {this.props.score.points}
                        </S.ScoreTitle>
                        <S.ScoreDetails>
                            Based on {this.props.score.answersCorrect} correct
                            song choices
                        </S.ScoreDetails>
                    </TextWithFadeIn>
                    <S.ResultsButtons>
                        <ShareButtonWithFadeIn>
                            <Button
                                onClick={() => share(this.props.score.points)}
                            >
                                Share Your Score
                            </Button>
                        </ShareButtonWithFadeIn>
                        <TryAgainButtonWithFadeIn>
                            <Link to="/app" style={{ textDecoration: 'none' }}>
                                <Text color="brandBlue.3">Try Again</Text>
                            </Link>
                        </TryAgainButtonWithFadeIn>
                    </S.ResultsButtons>
                </S.ResultsPageContents>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    score: state.score
});

export default connect(mapStateToProps)(PageResults);
