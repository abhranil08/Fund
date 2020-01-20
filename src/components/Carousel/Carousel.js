import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classes from './Carousel.module.css';

const exportedCarousel = props => {

  return (
    <Carousel className={classes.Carousel}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://hs177.files.wordpress.com/2018/10/learn-basics-of-mutual-funds-1.png?w=1194"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.getsmarteraboutmoney.ca/wp-content/uploads/2017/05/MutualSegregatedFunds_Hero-1920x1138.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default exportedCarousel;