import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { animated } from 'react-spring';
import withDelayedFadeIn from '../../util/withDelayedFadeIn';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import Button from '../../components/Button/Button';
import NavBar from '../../components/NavBar/NavBar';
import * as S from './styles';

const TextWithFadeIn = withDelayedFadeIn(S.ResultsText, 50);
const ShareButtonWithFadeIn = withDelayedFadeIn(animated.div, 2000);
const TryAgainButtonWithFadeIn = withDelayedFadeIn(S.TryAgain, 2250);

class PageResults extends Component {
    render() {
        return (
            <div>
                <GradientBackground />
                <NavBar />
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
                            <Button>Share Your Score</Button>
                        </ShareButtonWithFadeIn>
                        <TryAgainButtonWithFadeIn>
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: 'white'
                                }}
                                to="/app"
                            >
                                Try Again
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
