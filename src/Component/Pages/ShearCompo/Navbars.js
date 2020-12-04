import React from 'react';
import './Css/Navbar.css'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logos/logo.png';
const Navbars = () => {
    window.onscroll = () => { myFunction() };
    const myFunction = () => {
        const header = document.getElementById("navbarSticky");
        const sticky = header.offsetTop;
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
            header.classList.add("showcase");
        } else {
            header.classList.remove("sticky");
        }
    }

    return (
        <Navbar bg="" expand="lg" id="navbarSticky" className="header MyWonNavbar">
            <Container>
                <Navbar.Brand>
                    <Link to="/" id="header-logo">
                        <img src={logo} alt="logo.png" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav className="nav-menu">
                            <Link to="/home" className="nav-item">Home</Link>
                        </Nav>
                        <Nav className="nav-menu">
                            <Link to="/" className="nav-item">Our Portfolio</Link>
                        </Nav>
                        <Nav className="nav-menu">
                            <Link to="/" className="nav-item">Our Team</Link>
                        </Nav>
                        <Nav className="nav-menu">
                            <Link to="/" className="nav-item">Contact Us</Link>
                        </Nav>
                        <Nav className="nav-menu">
                            <Link to="/login" className="login-btn">Login</Link>
                        </Nav>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navbars;