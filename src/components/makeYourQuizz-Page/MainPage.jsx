import React from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

import PlayButton from './PlayButton';
import ThemeCards from './ThemeCards';
import Difficulty from './Difficulty';
import NumberOfQuestions from './NumberOfQuestions';
import styles from './MainPage.module.css';

const findCharacters = [
  '&amp;',
  '&quot;',
  '&#039;',
  '&eacute;',
  '&uuml;',
  '&rsquo;',
];
const replaceCharacters = ['&', '"', "'", 'é', 'ü', '’'];

class Main extends React.Component {
  static shuffle(arr) {
    const array = arr;
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  constructor(props) {
    super(props);
    this.state = {
      theme: null,
      difficulty: null,
      numberOfQuestions: null,
      answers: [],
      questions: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData() {
    const { numberOfQuestions, theme, difficulty } = this.state;
    if (numberOfQuestions && theme && difficulty) {
      axios
        .get(
          `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${theme}&difficulty=${difficulty}&type=multiple`
        )
        .then((response) => {
          const data = response.data.results;
          this.sortAnswersAndQuestions(data);
        })
        .catch((error) => {
          this.setState({ error });
          swal({
            title: 'Something wrong happened...',
            text: 'Please try again',
            icon: 'error',
          });
        });
    } else {
      swal({
        title: "Didn't work dude...",
        text: 'Please select a theme, a difficulty and a number of question!',
        icon: 'error',
      });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  replaceSpecialCharacter(str, findElement, replaceBy) {
    this.string = str;
    for (let i = 0; i < findElement.length; i += 1) {
      this.string = this.string.replace(
        new RegExp(findElement[i], 'gmi'),
        replaceBy[i]
      );
    }
    return this.string;
  }

  sortAnswersAndQuestions(data) {
    let rightAnswers = [];
    let wrongAnswers = [];
    let allAnswers = [];
    let shuffledAnswers = [];
    let shuffledAnswersArray = [];
    let questionsArray = [];

    for (let i = 0; i < data.length; i += 1) {
      rightAnswers = data.map((elt) => {
        return {
          id: 3,
          label: this.replaceSpecialCharacter(
            elt.correct_answer,
            findCharacters,
            replaceCharacters
          ),
          isCorrect: true,
        };
      });

      const wrong = data[i].incorrect_answers;
      wrongAnswers = wrong.map((elt, index) => {
        return {
          id: index,
          label: this.replaceSpecialCharacter(
            elt,
            findCharacters,
            replaceCharacters
          ),
          isCorrect: false,
        };
      });

      allAnswers = [rightAnswers[i], ...wrongAnswers];
      shuffledAnswers = Main.shuffle(allAnswers);
      shuffledAnswersArray = [...shuffledAnswersArray, [...shuffledAnswers]];

      questionsArray = data.map((question, index) => {
        return {
          id: index,
          label: this.replaceSpecialCharacter(
            question.question,
            findCharacters,
            replaceCharacters
          ),
        };
      });
    }

    const { history } = this.props;
    this.setState(
      { answers: shuffledAnswersArray, questions: questionsArray },
      () => {
        history.push({
          pathname: `/play/${0}`,
          state: {
            ...this.state,
          },
        });
      }
    );
  }

  render() {
    const { answers } = this.state;

    return (
      <div className={styles.container}>
        <ThemeCards changeTheme={this.handleChange} />
        <Difficulty changeDifficulty={this.handleChange} />
        <NumberOfQuestions changeNumberOfQuestions={this.handleChange} />
        <PlayButton getData={this.getData} answers={answers} />
      </div>
    );
  }
}

Main.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Main;
