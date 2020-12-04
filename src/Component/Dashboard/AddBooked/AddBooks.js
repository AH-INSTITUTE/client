import React, { useState } from 'react';
import './AddService.css';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import '../MediaQuery.css';
const AddBooks = () => {
    const uploadIcon = <FontAwesomeIcon icon={faCloudUploadAlt} />

    const actualBtn = document.getElementById('actual-btn');
    const fileChosen = document.getElementById('file-chosen');
    if (actualBtn) {
        actualBtn.addEventListener('change', function () {
            fileChosen.textContent = this.files[0].name
        })
    }

    const [formData, updateFormData] = useState({
        bookName: "",
        author: "",
        genre: "",
        releaseDate: "",
        statusOption: "Pending",
        bookImage: null
    });
    const getData = (e) => {
        updateFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    }
    const getUploadFils = (e) => {
        updateFormData({ ...formData, [e.target.name]: e.target.files[0] })
    }

    const onSubmits = (e) => {
        const formsData = new FormData();
        formsData.append("bookName", formData.bookName);
        formsData.append("author", formData.author);
        formsData.append("genre", formData.genre);
        formsData.append("releaseDate", formData.releaseDate);
        formsData.append("statusOption", formData.statusOption);
        formsData.append("bookImage", formData.bookImage);

        fetch(`https://softx-library-management.herokuapp.com/add-books`, {
            method: 'POST',
            body: formsData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert("Book Add Successfully... Hurray!")
                }
                if (data.success === false) {
                    alert("Book Not Added... Sad!")
                }
            })
            .then(() => {
                window.location.reload();
            })
        e.preventDefault()
    }
    return (
        <Form className="row bg-white p-4 m-3" onSubmit={e => onSubmits(e)}>
            <div className="col-md-6">
                <label htmlFor="">Book Name:</label>
                <Form.Control type="text" placeholder="Enter Book Name" name="bookName" required onBlur={(e) => getData(e)} />
                <label htmlFor="">Author:</label>
                <Form.Control type="text" placeholder="Enter Author Name" name="author" required onBlur={(e) => getData(e)} />
                <label htmlFor="">Genre:</label>
                <Form.Control type="text" placeholder="Enter Genre" name="genre" required onBlur={(e) => getData(e)} />
                <br />
                <br />
            </div>
            <div className="col-md-6">
                <label htmlFor="">Release Date:</label>
                <Form.Control type="date" placeholder="Enter Release Date" name="releaseDate" required onBlur={(e) => getData(e)} />
                <label htmlFor="">Image</label> <br />
                <Form.File name="bookImage" required onBlur={(e) => getUploadFils(e)} accept="image/*" id="actual-btn" className="file-input" />
                <label htmlFor="actual-btn" className="btn btn-outline-success responsive-mobile-width">
                    {uploadIcon} Upload
                    <span className="responsive-file"> project file</span>
                </label>
                <span id="file-chosen"></span>
            </div>
            <div className="col-md-12">
                <Button variant="success" type="submit" className="float-right responsive-tablet-btn">
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default AddBooks;