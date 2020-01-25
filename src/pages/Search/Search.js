import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './Search.module.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

const Search = props => {
  const [inputFamily, setInputFamily] = useState("Aditya Birla Sun Life Mutual Fund");
  const [inputScheme, setInputScheme] = useState("All");
  const [mutualFundFamilies, setMutualFundFamilies] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("https://latest-mutual-fund-nav.p.rapidapi.com/fetchAllMutualFundFamilies", {
      headers: {
        "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com",
        "x-rapidapi-key": "b52e9f507amshaffdde729615041p170c0fjsn3840f8f00c7e"
      },
    }).then(res => res.json())
      .then(d => {
        setMutualFundFamilies(d)
      })
      .catch(err => console.log(err));
  }, [])

  const handleSearch = () => {
    setIsLoading(true);
    fetch(`https://latest-mutual-fund-nav.p.rapidapi.com/fetchLatestNAV?MutualFundFamily=${inputFamily}&SchemeType=${inputScheme}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com",
        "x-rapidapi-key": "b52e9f507amshaffdde729615041p170c0fjsn3840f8f00c7e"
      }
    }).then(res => res.json())
      .then(d => {
        setData(d);
        setIsLoading(false);
      })
  }

  return (
    <section className={classes.Search}>
      <Container>
        <Row className="py-4 d-flex justify-content-center align-items-center">
          <Col md={5}>
            <Form.Label>Mutual Fund Family</Form.Label>
            <Form.Control as="select" onChange={e => setInputFamily(e.target.value)}>
              {mutualFundFamilies.length > 0 ? (
                mutualFundFamilies.map((d, index) => <option key={index} value={d}>{d}</option>)
                ) : <option>Loading...</option>
              }
            </Form.Control>
          </Col>
          <Col md={4}>
            <Form.Label>Scheme</Form.Label>
            <Form.Control as="select" onChange={e => setInputScheme(e.target.value)}>
              <option>All</option>
              <option>Open Ended Schemes</option>
              <option>Close Ended Schemes</option>
              <option>Interval Fund Schemes</option>
            </Form.Control>
          </Col>
          <Col md={3} className="d-flex flex-column align-items-stretch">
            <Form.Label>&nbsp;</Form.Label>
            <Button variant="primary" onClick={handleSearch}>Get latest NAV</Button>
          </Col>
        </Row>
        <Row className="py-4 d-flex justify-content-center align-items-center">
          <Col md={12}>
            <Table striped hover size="sm" className="mt-2">
              <thead>
                <tr>
                  <th>
                    Scheme Name
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
                  <th>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                  {isLoading ? <tr><td><Spinner animation="grow" variant="dark" /></td></tr> : (
                    data.length > 0 ? (
                      data.map((d, index) => {
                        return (
                          <tr key={index} className={classes.tableEntry}>
                            <td>
                              <Link to={`/search/${d['Scheme Code']}`}>{d['Scheme Name']}</Link>
                            </td>
                            <td>{d['Scheme Category']}</td>
                            <td>{d['Scheme Type']}</td>
                            <td>{d['Mutual Fund Family']}</td>
                            <td>{d['Net Asset Value']}</td>
                            <td>{d['Date']}</td>
                          </tr>
                        );
                      })
                    ) : <tr><td colSpan={12}>No results</td></tr>
                  )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Search;