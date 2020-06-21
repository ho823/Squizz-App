import React from 'react';

import axios from 'axios';
import { Card, Button, Form, Spinner } from 'react-bootstrap';

import PropTypes from 'prop-types';

import generalknowledge from './images/generalknowledge.jpg';
import book from './images/book.jpg';
import film from './images/film.jpg';
import music from './images/music.jpg';
import theater from './images/theater.jpg';
import television from './images/television.jpg';
import videogame from './images/videogame.jpg';
import boardgame from './images/boardgame.jpg';
import science from './images/science.jpg';
import computer from './images/computer.jpg';
import mathematics from './images/mathematics.jpg';
import mythology from './images/mythology.jpg';
import sport from './images/sport.jpg';
import geography from './images/geography.jpg';
import history from './images/history.jpg';
import politics from './images/politics.jpg';
import art from './images/art.jpg';
import celebrity from './images/celebrity.jpg';
import animal from './images/animal.jpg';
import vehicle from './images/vehicle.jpg';
import comics from './images/comics.jpg';
import gadgets from './images/gadgets.jpg';
import japaneseanimate from './images/japaneseanimate.jpg';
import cartoon from './images/cartoon.jpg';

import styles from './ThemeCards.module.css';

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

class ThemeCards extends React.Component {
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
    const { themes, isLoading, error } = this.state;
    if (isLoading) {
      return <Spinner animation="border" variant="warning" />;
    }
    if (error) {
      return <div>ERROR</div>;
    }

    const { changeTheme } = this.props;
    return (
      <div className={styles.container}>
        <Form.Label>Choose a theme: </Form.Label>
        <div className={styles.theme}>
          {themes.map((theme) => (
            <Card className={styles.card} key={theme.id}>
              <Card.Img className={styles.image} src={theme.image} />
              <Card.Body className={styles.cardBody}>
                <Button
                  className={styles.button}
                  variant="warning"
                  value={theme.id}
                  name="theme"
                  onClick={changeTheme}
                >
                  {theme.name}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className={styles.select}>
          <Form.Control as="select" custom name="theme" onChange={changeTheme}>
            <option className={styles.option}>Themes...</option>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </Form.Control>
        </div>
      </div>
    );
  }
}

ThemeCards.propTypes = {
  changeTheme: PropTypes.func.isRequired,
};

export default ThemeCards;
