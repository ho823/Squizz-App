import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

import Answers from './Answers';
import NextButton from './NextButton';
import Question from './Question';
import ProgressBar from './ProgressBar';

class MainPlayTheQuizz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 0,
      percentage: 0,
      hasTriggered: false,
      score: 0,
      loading: true,
    };
    this.handleClickToNextQuestion = this.handleClickToNextQuestion.bind(this);
    this.rightOrWrongAnswers = this.rightOrWrongAnswers.bind(this);
  }

  componentDidMount() {
    const {
      location: {
        state: { answers, questions, numberOfQuestions, theme },
      },
    } = this.props;
    this.setState((state) => ({
      ...state,
      numberOfQuestions,
      theme,
      answers,
      questions,
      loading: false,
    }));
    this.interval = setInterval(() => this.handleProgress(), 200);
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params },
    } = this.props;
    if (prevProps.match.params.round !== params.round) {
      clearInterval(this.interval);
      // eslint-disable-next-line
      this.setState((state) => ({
        ...state,
        percentage: 0,
        hasTriggered: false,
      }));
      this.interval = setInterval(() => this.handleProgress(), 200);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleProgress() {
    const { percentage } = this.state;
    this.setState((prevState) => ({
      percentage: prevState.percentage + 1,
    }));
    if (percentage === 99) {
      clearInterval(this.interval);
      this.setState({ hasTriggered: true });
    }
  }

  rightOrWrongAnswers(e) {
    const { hasTriggered, percentage, answers, round } = this.state;
    clearInterval(this.interval);

    if (!hasTriggered && percentage < 100) {
      this.setState({
        hasTriggered: true,
      });
      const rightOne = answers[round].filter((item) => item.isCorrect === true);
      if (Number(e.target.id) === rightOne[0].id) {
        this.setState((state) => ({ score: state.score + 1 }));
      }
    } else if (hasTriggered) {
      swal({
        title: 'You shall not pass...',
        icon: 'error',
      });
    } else if (percentage === 100) {
      swal({
        title: 'too late dude...',
        icon: 'error',
      });
    }
  }

  handleClickToNextQuestion() {
    const { history } = this.props;
    const { round, score, numberOfQuestions, theme } = this.state;
    if (numberOfQuestions - round > 1) {
      this.setState(
        (state) => ({
          round: Number(state.round + 1),
          percentage: -1,
          hasTriggered: false,
        }),
        () => {
          // eslint-disable-next-line
          history.push(`/play/${this.state.round}`);
        }
      );
    } else {
      history.push({
        pathname: '/score',
        state: {
          score,
          numberOfQuestions,
          theme,
        },
      });
    }
  }

  render() {
    const {
      round,
      percentage,
      numberOfQuestions,
      questions,
      answers,
      loading,
      hasTriggered,
    } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <Question question={questions[round]} />
        <Answers
          answers={answers[round]}
          checkIfRightOrWrong={this.rightOrWrongAnswers}
          hasTriggered={hasTriggered}
        />
        <ProgressBar percentage={percentage} />
        <NextButton
          nextQuestion={this.handleClickToNextQuestion}
          numberOfQuestions={numberOfQuestions}
        />
      </>
    );
  }
}

MainPlayTheQuizz.propTypes = {
  location: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      round: PropTypes.string,
    }),
  }).isRequired,
};

export default MainPlayTheQuizz;
