import React from 'react';
import './Css/Header.css'
import { Col, Container } from 'react-bootstrap';

const Footer = () => {
    const onSubmits = (e) => {

        e.preventDefault()
    }

    return (
        <footer id="footer" className="row container m-auto">
            <Col md={12} className="text-center copyright">
                Copyright Abu Hasan 2020 All rights reserved.
            </Col>
        </footer>
    );
};

export default Footer;