import React, { useContext } from 'react';
import { Col, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import './Dashboard.css'
import { AuthContext } from '../AuthData/Auth';
import { ExtraDataContext } from '../ExtraData/ExtraData';
import Oder from './Order/Oder';
import Sidebar from './Sidebar/Sidebar';
import ClientService from './ClientService/ClientService';
import BookLists from './BookListed/BookLists';
import AddBooks from './AddBooked/AddBooks';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    document.title = "Dashboard Page";
    const auth = useContext(AuthContext);
    const { logOut } = auth;
    const ExtraData = useContext(ExtraDataContext);
    const { seeData } = ExtraData;

    const getName = sessionStorage.getItem('name');
    const handLogOut = () => {
        logOut();
        sessionStorage.clear();
        window.location.reload();
    }

    return (
        <div className="container-fluid">
            <Row className="p-4">
                <Col lg={2} md={3} className="pt-3">
                    <h3 className="dash-title">
                        <Link to="/">
                            {"Home"}
                        </Link>
                    </h3>

                    <Sidebar />
                </Col>
                <Col lg={10} md={9} >
                    <Navbar bg="">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nav className="mr-auto">
                            <Nav.Link className="text-dark">
                                <h3 className="dash-title">
                                    {seeData.order === true ? "Order" : ""}
                                    {seeData.serviceClient === true ? "Service List" : ""}
                                    {seeData.BookList === true ? "Book List" : ""}
                                    {seeData.addBook === true ? "Add Book" : ""}
                                </h3>
                            </Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <NavDropdown title={`${getName !== null ? getName : window.location.reload()}`} id="basic-nav-dropdown">
                                <NavDropdown.Item
                                    onClick={() => handLogOut()}
                                    className="logout-btn"
                                >LogOut</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar>
                    <section id="content-section">
                        {seeData.order === true ? <Oder /> : ""}
                        {seeData.serviceClient === true ? <ClientService /> : ""}
                        {seeData.BookList === true ? <BookLists /> : ""}
                        {seeData.addBook === true ? <AddBooks /> : ""}
                    </section>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;