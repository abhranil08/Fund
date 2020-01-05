import React from 'react';
import classes from './Home.module.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Home = props => {
  return (
    <section className={classes.Homepage}>
      <Container>
        <Row className="py-2">
          <Col xs={12} className={classes.heading}>
            <h2>The more you save, the more you safe</h2>
          </Col>
        </Row>
        <Row className="py-2">
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <Card className={classes.landingCard}>
              <Card.Body>
                <Card.Title className="pt-2"><strong>Mutual Fund Investment</strong></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">lorem ipsum dolor</Card.Subtitle>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Card.Text>
                <hr />
                <Card.Link href="#">
                  <Button variant="success">Invest now</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <Card className={classes.landingCard}>
              <Card.Body>
                <Card.Title className="pt-2"><strong>Income Tax Filing</strong></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">lorem ipsum dolor</Card.Subtitle>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Card.Text>
                <hr />
                <Card.Link href="#">
                  <Button variant="info">Continue</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="py-3">
          <Col xs={12} className="d-flex flex-column justify-content-center align-items-center">
            <h4>Save Tax upto &#8377;46,800</h4>
            <h5>U/S 80C</h5>
            <h5>ILSS</h5>
          </Col>
        </Row>
        <Row className="py-3">
          <Col xs={12} className="d-flex flex-column justify-content-center align-items-center">
            <h2>Our mutual fund partners:</h2>
            <div className={classes.partnersFlex}>
              <span>Axis</span>
              <span>ICICI</span>
              <span>Birla</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;