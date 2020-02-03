import React, { useState, useEffect, useContext } from 'react';
import { database } from '../../firebase/config';
import { AuthContext } from '../../context/authContext';
import PieChart from '../../components/PieChart/PieChart';
import AddUnits from '../../components/AddUnits/AddUnits';
import classes from './Dashboard.module.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = props => {
  const { currentUser } = useContext(AuthContext);
  const [currentNAV, setCurrentNAV] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dashControlsKey, setDashControlsKey] = useState('your-mutual-funds');
  const [investorsKey, setInvestorsKey] = useState('overall-gain-or-loss');

  useEffect(() => {
    let urls = [];
    database.ref('orders').once('value')
      .then(res => {
        const fetchedOrders = res.val();
        const orders = [];
        for (let orderID in fetchedOrders) {
          if (fetchedOrders[orderID].userID === currentUser.uid) {
            orders.push({
              id: orderID,
              ...fetchedOrders[orderID]
            })
          }
        }
        setUserOrders(orders);
        for (let order in orders) {
          urls.push(`https://latest-mutual-fund-nav.p.rapidapi.com/fetchLatestNAV?SchemeType=All&SchemeCode=${orders[order].schemeCode}`);
        }
        Promise.all(urls.map(url => {
          return fetch(url, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com",
              "x-rapidapi-key": "b52e9f507amshaffdde729615041p170c0fjsn3840f8f00c7e"
            }
          }).then(res => res.json())
            .catch(err => console.log(err));
        })).then(data => {
          setCurrentNAV(data.map((d, i) => d[0]));
          setIsLoading(false);
        })
      })
  }, [currentUser.uid])

  return (
  <section className={classes.Dashboard}>
    <Container>
      <Row className="py-3">
        <h3>Investor database</h3><hr />
        <Col sm={12} className="my-2">
          <Tabs id="investor-tabs" activeKey={investorsKey} onSelect={k => setInvestorsKey(k)}>
            <Tab className="py-3" eventKey="overall-gain-or-loss" title="Overall Gain or Loss">
              Overall gain or loss
              <PieChart />
            </Tab>
            <Tab className="py-3" eventKey="todays-gain-or-loss" title="Today's Gain or Loss">
              Today's gain or loss
              <PieChart />
            </Tab>
            <Tab className="py-3" eventKey="total-aum" title="Total AUM">
              Total AUM
            </Tab>
          </Tabs>
        </Col>
        <Col sm={12} className="my-2">
          <Tabs id="dashboard-controls-tab" activeKey={dashControlsKey} onSelect={k => setDashControlsKey(k)}>
            <Tab className="py-3" eventKey="your-mutual-funds" title="Your Mutual Funds">
              <Table striped hover className="mt-2">
                <thead>
                  <tr>
                    <th>Folio no.</th>
                    <th>Units</th>
                    <th>Cost value</th>
                    <th>Current Value</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? <tr><td><Spinner animation="grow" variant="primary" /></td></tr> : userOrders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.unitsLeft}</td>
                        <td>{order.costValue}</td>
                        <td>{currentNAV[index]['Net Asset Value']}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab className="py-3" eventKey="add" title="Add">
              <Table striped hover className="mt-2">
                <thead>
                  <tr>
                    <th>Folio no.</th>
                    <th>Units Left</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? <tr><td><Spinner animation="grow" variant="primary" /></td></tr> : userOrders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.unitsLeft}</td>
                        <td>
                          <AddUnits
                            currentUser={currentUser}
                            orderId={order.id}
                            unitPrice={currentNAV[index]['Net Asset Value']} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab className="py-3" eventKey="sell" title="Sell">
              Sell
            </Tab>
            <Tab className="py-3" eventKey="switch" title="Switch">
              Switch
            </Tab>
            <Tab className="py-3" eventKey="graph" title="Graph">
              Graph
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  </section>
  );
}

export default Dashboard;