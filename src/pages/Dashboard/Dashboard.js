import React from 'react';
import classes from './Dashboard.module.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Dashboard = props => {
  return (
    <section className={classes.Dashboard}>
      <Container>
        <Row>
          <Col>
            <h1>Dashboard</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Dashboard;