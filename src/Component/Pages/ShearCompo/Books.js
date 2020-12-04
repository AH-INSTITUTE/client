import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import './Css/Header.css'
import './Css/MediaQuery.css'
const Books = () => {

    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        fetch("https://softx-library-management.herokuapp.com/get-active-book?statusOption=Activate")
            .then(res => res.json())
            .then(data => {
                setServiceData(data);
            })
    }, [])

    const location = useLocation();
    const history = useHistory()
    let { from } = location.state || { from: { pathname: "/dashboard" } };
    const ClickPathChange = () => {
        history.replace(from);
    }

    return (
        <Row>
            <div className="services-title text-center mt-5 mb-3 col-sm-12">
                <h3>All Active <span className="text-success">Books</span></h3>
            </div>
            {serviceData.length > 0 ? serviceData.map(data =>
                <Col md={3} className="p-4" key={data._id}>
                    <div className="service-card p-3" onClick={() => ClickPathChange()}>
                        <div className="service-imgs text-center">
                            <img src={`data:image/jpeg;base64,${data.createImg.img}`} alt="img" />
                        </div>
                        <div className="service-info text-center">
                            <h3>{data.bookName}</h3>
                            <p>Author: {data.author}</p>
                        </div>
                        <div>
                            <button className="btn btn-success  w-100" onClick={() => history.push("/dashboard")}>Book Request</button>
                        </div>
                    </div>
                </Col>
            ) : <div className="m-auto">
                    <LoadingSpinner />
                </div>
            }
        </Row>
    );
};

export default Books;