import React, { useState, useEffect, useMemo } from 'react';
import LineChart from '../../components/LineChart/LineChart';
import classes from './FundDisplay.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

let currentDate, newDate;
const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

currentDate = new Date();
const yesterday = String((+currentDate.getDate() - 2) + "-" + monthNames[currentDate.getMonth()] + "-" + currentDate.getFullYear());

currentDate = new Date();
newDate = currentDate.getDate() - 7;
currentDate.setDate(newDate);
const oneWeekBefore = String(currentDate.getDate() + "-" + monthNames[currentDate.getMonth()] + "-" + currentDate.getFullYear());

currentDate = new Date();
newDate = currentDate.getMonth() - 1;
currentDate.setMonth(newDate);
const oneMonthBefore = String(currentDate.getDate() + "-" + monthNames[currentDate.getMonth()] + "-" + currentDate.getFullYear());

currentDate = new Date();
newDate = currentDate.getMonth() - 6;
currentDate.setMonth(newDate);
const sixMonthsBefore = String(currentDate.getDate() + "-" + monthNames[currentDate.getMonth()] + "-" + currentDate.getFullYear());

currentDate = new Date()
newDate = (+currentDate.getFullYear()) - 1;
currentDate.setFullYear(newDate);
const oneYearBefore = String(currentDate.getDate() + "-" + monthNames[currentDate.getMonth()] + "-" + currentDate.getFullYear());

currentDate = new Date();
newDate = (+currentDate.getFullYear()) - 2;
currentDate.setFullYear(newDate);
const twoYearsBefore = String(currentDate.getDate() + "-" + monthNames[currentDate.getMonth()] + "-" + currentDate.getFullYear());

const getChartData = async (schemeCode) => {
  const curDate = new Date();
  const urls = [];
  for (let i = 0; i < 12; i++) {
    let newDate = curDate.getMonth() - 1;
    curDate.setMonth(newDate);
    const formattedDate = String(curDate.getDate() + "-" + monthNames[curDate.getMonth()] + "-" + curDate.getFullYear());
    urls.push(`https://latest-mutual-fund-nav.p.rapidapi.com/fetchHistoricalNAV?SchemeCode=${schemeCode}&SchemeType=All&Date=${formattedDate}`);
  }
  urls.reverse();
  return Promise.all(urls.map(async url => {
    try {
      const res = await fetch(url, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com",
          "x-rapidapi-key": "b52e9f507amshaffdde729615041p170c0fjsn3840f8f00c7e"
        }
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }))
}

const FundDisplay = props => {
  const { params: { mfSchemeCode } } = props.match;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [oneDayDifference, setOneDayDifference] = useState(null);
  const [oneWeekReturn, setOneWeekReturn] = useState(null);
  const [oneMonthReturn, setOneMonthReturn] = useState(null);
  const [sixMonthsReturn, setSixMonthsReturn] = useState(null);
  const [oneYearReturn, setOneYearReturn] = useState(null);
  const [twoYearReturn, setTwoYearReturn] = useState(null);
  const [chartData, setChartData] = useState([]);

  const urls = useMemo(() => [
    `https://latest-mutual-fund-nav.p.rapidapi.com/fetchHistoricalNAV?SchemeCode=${mfSchemeCode}&SchemeType=All&Date=${yesterday}`,
    `https://latest-mutual-fund-nav.p.rapidapi.com/fetchHistoricalNAV?SchemeCode=${mfSchemeCode}&SchemeType=All&Date=${oneWeekBefore}`,
    `https://latest-mutual-fund-nav.p.rapidapi.com/fetchHistoricalNAV?SchemeCode=${mfSchemeCode}&SchemeType=All&Date=${oneMonthBefore}`,
    `https://latest-mutual-fund-nav.p.rapidapi.com/fetchHistoricalNAV?SchemeCode=${mfSchemeCode}&SchemeType=All&Date=${sixMonthsBefore}`,
    `https://latest-mutual-fund-nav.p.rapidapi.com/fetchHistoricalNAV?SchemeCode=${mfSchemeCode}&SchemeType=All&Date=${oneYearBefore}`,
    `https://latest-mutual-fund-nav.p.rapidapi.com/fetchHistoricalNAV?SchemeCode=${mfSchemeCode}&SchemeType=All&Date=${twoYearsBefore}`,
  ], [mfSchemeCode]);

  useEffect(() => {
    fetch(`https://latest-mutual-fund-nav.p.rapidapi.com/fetchLatestNAV?SchemeType=All&SchemeCode=${mfSchemeCode}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com",
        "x-rapidapi-key": "b52e9f507amshaffdde729615041p170c0fjsn3840f8f00c7e"
      }
    }).then(res => res.json())
      .then(result => {
        setData(result[0])
        setIsLoading(false);
        Promise.all(urls.map(url => {
          return fetch(url, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com",
              "x-rapidapi-key": "b52e9f507amshaffdde729615041p170c0fjsn3840f8f00c7e"
            }
          }).then(res => res.json())
            .catch(err => console.log(err))
        }))
          .then(([oneDay, oneWeek, oneMonth, sixMonths, oneYear, twoYears]) => {
            let diff, percentDiff;
          
            if (oneDay[0] !== undefined) {
              diff = +(result[0]['Net Asset Value'] - oneDay[0]['Net Asset Value']);
              percentDiff = (diff/result[0]['Net Asset Value']) * 100;
              if (diff > 0) {
                const content = <small style={{ color: 'green' }}>{percentDiff.toFixed(2)}%</small>
                setOneDayDifference(content);
              } else {
                const content = <small style={{ color: 'red' }}>{percentDiff.toFixed(2)}%</small>
                setOneDayDifference(content);
              }
            } else {
              setOneDayDifference(<small>&nbsp;</small>)
            }

            if (oneWeek[0] !== undefined) {
              diff = +(result[0]['Net Asset Value'] - oneWeek[0]['Net Asset Value']);
              percentDiff = (diff/result[0]['Net Asset Value']) * 100;
              if (diff > 0) {
                const content = <small style={{ color: 'green' }}>{percentDiff.toFixed(2)}%</small>
                setOneWeekReturn(content);
              } else {
                const content = <small style={{ color: 'red' }}>{percentDiff.toFixed(2)}%</small>
                setOneWeekReturn(content);
              }
            } else {
              setOneWeekReturn(<small>Data not available</small>)
            }

            if (oneMonth[0] !== undefined) {
              diff = +(result[0]['Net Asset Value'] - oneMonth[0]['Net Asset Value']);
              percentDiff = (diff/result[0]['Net Asset Value']) * 100;
              if (diff > 0) {
                const content = <small style={{ color: 'green' }}>{percentDiff.toFixed(2)}%</small>
                setOneMonthReturn(content);
              } else {
                const content = <small style={{ color: 'red' }}>{percentDiff.toFixed(2)}%</small>
                setOneMonthReturn(content);
              }
            } else {
              setOneMonthReturn(<small>Data not available</small>)
            }

            if (sixMonths[0] !== undefined) {
              diff = +(result[0]['Net Asset Value'] - sixMonths[0]['Net Asset Value']);
              percentDiff = (diff/result[0]['Net Asset Value']) * 100;
              if (diff > 0) {
                const content = <small style={{ color: 'green' }}>{percentDiff.toFixed(2)}%</small>
                setSixMonthsReturn(content);
              } else {
                const content = <small style={{ color: 'red' }}>{percentDiff.toFixed(2)}%</small>
                setSixMonthsReturn(content);
              }
            } else {
              setSixMonthsReturn(<small>Data not available</small>)
            }

            if (oneYear[0] !== undefined) {
              diff = +(result[0]['Net Asset Value'] - oneYear[0]['Net Asset Value']);
              percentDiff = (diff/result[0]['Net Asset Value']) * 100;
              if (diff > 0) {
                const content = <small style={{ color: 'green' }}>{percentDiff.toFixed(2)}%</small>
                setOneYearReturn(content);
              } else {
                const content = <small style={{ color: 'red' }}>{percentDiff.toFixed(2)}%</small>
                setOneYearReturn(content);
              }
            } else {
              setOneYearReturn(<small>Data not available</small>)
            }

            if (twoYears[0] !== undefined) {
              diff = +(result[0]['Net Asset Value'] - twoYears[0]['Net Asset Value']);
              percentDiff = (diff/result[0]['Net Asset Value']) * 100;
              if (diff > 0) {
                const content = <small style={{ color: 'green' }}>{percentDiff.toFixed(2)}%</small>
                setTwoYearReturn(content);
              } else {
                const content = <small style={{ color: 'red' }}>{percentDiff.toFixed(2)}%</small>
                setTwoYearReturn(content);
              }
            } else {
              setTwoYearReturn(<small>Data not available</small>)
            }

            return getChartData(mfSchemeCode);
          })
          .then(chartData => {
            const cleanData = [];
            for (let d of chartData) {
              if (d[0]) {
                cleanData.push(d[0]);
              }
            }
            console.log(cleanData);
            setChartData(cleanData);
          })
      })
      .catch(err => {
        console.log(err);
      });
  }, [mfSchemeCode, urls]);

  return (
    <section className={classes.FundDisplay}>
      <Row className="d-flex justify-content-center align-items-center py-3 px-2">
        <Col md={12} className="d-flex flex-column justify-content-center align-items-center py-2">
          {isLoading ? <Spinner animation="grow" variant="primary"></Spinner> : (
            <>  
              <div className={classes.displayHeader}>
                <h2>{data['Scheme Name']}</h2>
                <h5><small>NAV:</small> &#8377; {data['Net Asset Value']} {oneDayDifference}<br /><small>(as on {data['Date']})</small></h5>
                <p>
                  Category: {data['Scheme Category']}<br />
                  Type: {data['Scheme Type']}<br />
                  Family: {data['Mutual Fund Family']}
                </p>
                <Button variant="success">Invest now</Button>
              </div>
              <div className={classes.chartContainer}>
                {(chartData.length > 0) ? <LineChart 
                                            datasetLabel={data['Scheme Name']}
                                            dataset={chartData} /> : <Spinner animation="grow" variant="primary"></Spinner>}
              </div>
              <div className={classes.returns}>
                <h2>Returns <small>(NAV as on {data['Date']})</small></h2>
                <Table striped hover className="mt-2">
                  <thead>
                    <tr>
                      <th>
                        Period invested for
                      </th>
                      <th>
                        Date
                      </th>
                      <th>
                        Absolute returns
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1 week</td>
                      <td>{oneWeekBefore}</td>
                      <td>{oneWeekReturn}</td>
                    </tr>
                    <tr>
                      <td>1 month</td>
                      <td>{oneMonthBefore}</td>
                      <td>{oneMonthReturn}</td>
                    </tr>
                    <tr>
                      <td>6 months</td>
                      <td>{sixMonthsBefore}</td>
                      <td>{sixMonthsReturn}</td>
                    </tr>
                    <tr>
                      <td>1 year</td>
                      <td>{oneYearBefore}</td>
                      <td>{oneYearReturn}</td>
                    </tr>
                    <tr>
                      <td>2 years</td>
                      <td>{twoYearsBefore}</td>
                      <td>{twoYearReturn}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </Col>
      </Row>
    </section>
  );
}

export default FundDisplay;