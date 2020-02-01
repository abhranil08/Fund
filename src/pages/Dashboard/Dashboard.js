import React, { useState } from 'react';
import classes from './Dashboard.module.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import PayWithRazorpay from '../../components/PayWithRazorpay/PayWithRazorpay';

const Dashboard = props => {
  const [dashControlsKey, setDashControlsKey] = useState('your-mutual-funds');
  const [investorsKey, setInvestorsKey] = useState('overall-gain-or-loss');

  return (
  <section className={classes.Dashboard}>
    <Container>
      <Row className="py-3">
        <h3>Investor database</h3><hr />
        <Col sm={12} className="my-2">
          <Tabs id="investor-tabs" activeKey={investorsKey} onSelect={k => setInvestorsKey(k)}>
            <Tab eventKey="overall-gain-or-loss" title="Overall Gain or Loss">
              overall gain or loss
            </Tab>
            <Tab eventKey="todays-gain-or-loss" title="Today's Gain or Loss">
              Today's gain or loss
            </Tab>
            <Tab eventKey="total-aum" title="Total AUM">
              Total AUM
            </Tab>
          </Tabs>
        </Col>
        <Col sm={12} className="my-2">
          <Tabs id="dashboard-controls-tab" activeKey={dashControlsKey} onSelect={k => setDashControlsKey(k)}>
            <Tab eventKey="your-mutual-funds" title="Your Mutual Funds">
              <Table striped hover className="mt-2">
                <thead>
                  <tr>
                    <th>Folio no.</th>
                    <th>Units</th>
                    <th>Cost value</th>
                    <th>Current Value</th>
                  </tr>
                </thead>
              </Table>
            </Tab>
            <Tab eventKey="add" title="Add">
              Add More
              <br />
              <PayWithRazorpay />
            </Tab>
            <Tab eventKey="sell" title="Sell">
              Sell
            </Tab>
            <Tab eventKey="switch" title="Switch">
              Switch
            </Tab>
            <Tab eventKey="graph" title="Graph">
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