import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Card, Spinner, Container } from 'react-bootstrap/';

import generalknowledge from '../makeYourQuizz-Page/images/generalknowledge.jpg';
import book from '../makeYourQuizz-Page/images/book.jpg';
import film from '../makeYourQuizz-Page/images/film.jpg';
import music from '../makeYourQuizz-Page/images/music.jpg';
import theater from '../makeYourQuizz-Page/images/theater.jpg';
import television from '../makeYourQuizz-Page/images/television.jpg';
import videogame from '../makeYourQuizz-Page/images/videogame.jpg';
import boardgame from '../makeYourQuizz-Page/images/boardgame.jpg';
import science from '../makeYourQuizz-Page/images/science.jpg';
import computer from '../makeYourQuizz-Page/images/computer.jpg';
import mathematics from '../makeYourQuizz-Page/images/mathematics.jpg';
import mythology from '../makeYourQuizz-Page/images/mythology.jpg';
import sport from '../makeYourQuizz-Page/images/sport.jpg';
import geography from '../makeYourQuizz-Page/images/geography.jpg';
import history from '../makeYourQuizz-Page/images/history.jpg';
import politics from '../makeYourQuizz-Page/images/politics.jpg';
import art from '../makeYourQuizz-Page/images/art.jpg';
import celebrity from '../makeYourQuizz-Page/images/celebrity.jpg';
import animal from '../makeYourQuizz-Page/images/animal.jpg';
import vehicle from '../makeYourQuizz-Page/images/vehicle.jpg';
import comics from '../makeYourQuizz-Page/images/comics.jpg';
import gadgets from '../makeYourQuizz-Page/images/gadgets.jpg';
import japaneseanimate from '../makeYourQuizz-Page/images/japaneseanimate.jpg';
import cartoon from '../makeYourQuizz-Page/images/cartoon.jpg';

const imageList = [
  { image: generalknowledge },
  { image: book },
  { image: film },
  { image: music },
  { image: theater },
  { image: television },
  { image: videogame },
  { image: boardgame },
  { image: science },
  { image: computer },
  { image: mathematics },
  { image: mythology },
  { image: sport },
  { image: geography },
  { image: history },
  { image: politics },
  { image: art },
  { image: celebrity },
  { image: animal },
  { image: vehicle },
  { image: comics },
  { image: gadgets },
  { image: japaneseanimate },
  { image: cartoon },
];

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themes: imageList,
      isLoading: true,
    };
    this.mergeArrays = this.mergeArrays.bind(this);
  }

  async componentDidMount() {
    try {
      await axios
        .get('https://opentdb.com/api_category.php')
        .then(({ data }) => {
          this.setState({
            themes: this.mergeArrays(data.trivia_categories, imageList),
          });
        });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  mergeArrays(category, images) {
    this.mergedArray = [];
    for (let i = 0; i < category.length; i += 1) {
      this.mergedArray.push({ ...category[i], ...images[i] });
    }
    return this.mergedArray;
  }

  render() {
    const { isLoading, error, themes } = this.state;
    const {
      location: {
        state: { score },
      },
    } = this.props;
    const {
      location: {
        state: { numberOfQuestions },
      },
    } = this.props;
    const {
      location: {
        state: { theme },
      },
    } = this.props;
    const third = numberOfQuestions / 3;

    if (isLoading) {
      return <Spinner animation="border" variant="warning" />;
    }
    if (error) {
      return <div>ERROR</div>;
    }

    return (
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <h1>Scoreboard</h1>
        {themes
          .filter((item) => item.id === Number(theme))
          .map((item) => (
            <Card
              key={item.id}
              className="d-flex justify-content-center align-items-center border-0 "
            >
              <Card.Img variant="top" src={item.image} className="w-50 h-5O" />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{`${score}/${numberOfQuestions}`}</Card.Text>
                <Card.Text>
                  {score === numberOfQuestions && 'Perfect!!!'}
                  {score > third * 2 && 'Congratulations!!!'}
                  {score > third && score <= third * 2 && 'Getting better!'}
                  {score <= third && 'Keep trying...'}
                </Card.Text>
                <Link to="/playSoloQuizz">
                  <Button variant="info">Play again</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
      </Container>
    );
  }
}

ScoreBoard.propTypes = {
  location: PropTypes.number.isRequired,
};

export default ScoreBoard;
