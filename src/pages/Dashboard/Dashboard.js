import React, { useState, useEffect } from 'react';
import classes from './Dashboard.module.css';

import LineChart from '../../components/LineChart/LineChart';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = props => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://latest-mutual-fund-nav.p.rapidapi.com/fetchLatestNAV', {
      headers: {
        "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com",
        "x-rapidapi-key": "b52e9f507amshaffdde729615041p170c0fjsn3840f8f00c7e"
      },
    }).then(res => res.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <section className={classes.Dashboard}>
      <Container>
        <Row className="py-3">
          <Col>
            <h3>ELSS</h3><hr />
            <Table striped bordered hover size="sm" className="mt-2">
              <thead>
                <tr>
                  <th>Fund Name</th>
                  <th>3 Year return</th>
                  <th>5 Year return</th>
                  <th>NAV</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Aditya Birla Sun Life Tax Relief 96 Growth</td>
                  <td>12.31%</td>
                  <td>9.93%</td>
                  <td>32.47</td>
                </tr>
                <tr>
                  <td>Axis Long Term Equity Growth</td>
                  <td>17.41%</td>
                  <td>11.29%</td>
                  <td>49.6043</td>
                </tr>
                <tr>
                  <td>DSP Tax Saver Fund Growth</td>
                  <td>12.69%</td>
                  <td>10.8%</td>
                  <td>51.835</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="py-3">
          <Col md={8}>
            <LineChart />
          </Col>
          <Col md={4}>
            <h4>Example heading</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </Col>
        </Row>
        <h3>Investor database</h3><hr />
        <Row className="py-3">
          <Col>
            Overall Gain or Loss
          </Col>
          <Col>
            Today's Gain or Loss
          </Col>
          <Col>
            Total AUM
          </Col>
        </Row>
        <h3>All mutual funds:</h3>
        <Row>
          <Col>
            <Table striped bordered hover size="sm" className="mt-2">
              <thead>
                <tr>
                  <th>
                    Date
                  </th>
                  <th>
                    Scheme Name
                  </th>
                  <th>
                    Scheme Code
                  </th>
                  <th>
                    Scheme Category
                  </th>
                  <th>
                    Scheme Type
                  </th>
                  <th>
                    Mutual Fund Family
                  </th>
                  <th>
                    NAV
                  </th>
                  {/* <th>Folio no.</th>
                  <th>Units</th>
                  <th>Cost value</th>
                  <th>Current value</th> */}
                </tr>
              </thead>
              <tbody>
                  {isLoading ? <tr><td colSpan={7}><Spinner animation="grow" variant="dark" /></td></tr> : (
                    data.map((d, index) => {
                      return (
                        <tr key={index} className={classes.tableEntry}>
                          <td>{d['Date']}</td>
                          <td>{d['Scheme Name']}</td>
                          <td>{d['Scheme Code']}</td>
                          <td>{d['Scheme Category']}</td>
                          <td>{d['Scheme Type']}</td>
                          <td>{d['Mutual Fund Family']}</td>
                          <td>{d['Net Asset Value']}</td>
                        </tr>
                      );
                    })
                  )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Dashboard;