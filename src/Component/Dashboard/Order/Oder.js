import React, { useState } from 'react';
import './Order.css';
import { Button, Form } from 'react-bootstrap';

const Oder = () => {

    const getName = sessionStorage.getItem('name');
    const getEmail = sessionStorage.getItem('user');
    const [formData, updateFormData] = useState({
        name: getName,
        email: getEmail,
        bookName: "",
        dataStart: "",
        phoneNumber: "",
        option: ""
    });

    const getData = (e) => {
        updateFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    }

    const onSubmits = (e) => {
        const formsData = new FormData();
        formsData.append("name", formData.name);
        formsData.append("email", formData.email);
        formsData.append("bookName", formData.bookName);
        formsData.append("dataStart", formData.dataStart);
        formsData.append("dataEnd", formData.dataStart);
        formsData.append("phoneNumber", formData.phoneNumber);
        formsData.append("option", formData.option);

        fetch(`https://softx-library-management.herokuapp.com/add-request`, {
            method: 'POST',
            body: formsData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert('Order added successfully');
                }
                if (data.success === false) {
                    alert('Order added failed');
                }
            })
            .then(() => {
                window.location.reload();
            })
        e.preventDefault();
    }
    return (
        <Form className="row" onSubmit={e => onSubmits(e)}>
            <div className="col-md-9">
                <label htmlFor="" className="text-success">Your Name: </label>
                <Form.Control type="text" placeholder="Your Name / Company's Name" name="name" required onBlur={(e) => getData(e)} defaultValue={getName} />

                <label htmlFor="" className="text-success">Your Email: </label>
                <Form.Control type="email" placeholder="Enter email" required onChange={(e) => getData(e)} name="email" value={getEmail} />

                <label htmlFor="" className="text-success">Book Name: </label>
                <Form.Control type="text" placeholder="Book Name" name="bookName" required onBlur={(e) => getData(e)} />


                <label htmlFor="" className="text-success">Start Date: </label>
                <Form.Control type="date" placeholder="Enter Book Name" name="dataStart" required onBlur={(e) => getData(e)} />

                <label htmlFor="" className="text-success">End Date: </label>
                <Form.Control type="date" placeholder="Enter Book Name" name="dataEnd" required onBlur={(e) => getData(e)} />

                <label htmlFor="" className="text-success">Your Phone : </label>
                <Form.Control type="text" placeholder="Enter Phone Number" required onChange={(e) => getData(e)} name="phoneNumber" />

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Option</Form.Label>
                    <Form.Control as="select" onChange={(e) => getData(e)} name="option">
                        <option>Only One Book</option>
                        <option>All Book</option>
                    </Form.Control>
                </Form.Group>

            </div>
            <div className="col-md-12 mt-3">
                <Button variant="dark" type="submit" className="responsive-mobile-btn">
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default Oder;