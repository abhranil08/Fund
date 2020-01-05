import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import classes from './Footer.module.css';

const Footer = props => {
  return (
    <footer className={classes.footer}>
      <Container>
        <Row className="p-3">
          <Col className={classes.columnOne}>
            <ul className={classes.footerLinks}>
              <li>
                <Link className={classes.footerLink} to="/about">About Us</Link>
              </li>
              <li>
                <Link className={classes.footerLink} to="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link className={classes.footerLink} to="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <Link className={classes.footerLink} to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </Col>
          <Col className={classes.columnTwo}>
            <ul className={classes.socialLinks}>
              <h5>Follow us on social media!</h5>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;