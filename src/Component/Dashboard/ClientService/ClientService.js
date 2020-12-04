import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import './ClientService.css';

const ClientService = () => {
    const getEmail = sessionStorage.getItem('user');
    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        fetch(`https://softx-library-management.herokuapp.com/user-book-list?email=${getEmail}`)
            .then(res => res.json())
            .then(data => setServiceData(data))
    }, [getEmail])

    return (
        <Row>

            {serviceData.length > 0 ? serviceData.map(data =>
                <Col lg={6} className="p-3" key={data._id}>
                    <div className="client-service-card">
                        <div className="service-info-sec">
                            <h3>{data.name}</h3>
                            <p>{data.email}</p>
                            <p>{data.phoneNumber}</p>
                            <div className="d-flex justify-content-between responsive-mobile-flex">
                                <span className="text-danger">Book Name: {data.bookName}</span>
                                <span>Option: <span className="text-success">{data.option}</span></span>
                            </div>
                        </div>
                    </div>
                </Col>
            ) : <LoadingSpinner />}
        </Row>
    );
};

export default ClientService;