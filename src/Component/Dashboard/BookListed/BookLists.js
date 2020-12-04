import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import './AdminService.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const BookLists = () => {
    const downIcon = <FontAwesomeIcon icon={faChevronDown} />
    const getEmail = sessionStorage.getItem('user');
    const [adminService, setAdminService] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [ids, setIds] = useState("");
    const handleClickShowPopup = (e) => {
        setIds(e);
        setModalShow(true);
    }


    useEffect(() => {
        fetch(`https://softx-library-management.herokuapp.com/all-order-data/admin?email=${getEmail}`)
            .then(res => res.json())
            .then(data => {
                setAdminService(data)
                console.log(data);
            })
    }, [getEmail]);

    const handleUpdate = (id, strings) => {
        if (strings === 'Activate') {
            const statusOption = 'Activate';
            fetch(`https://softx-library-management.herokuapp.com/update-statue/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ statusOption })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success === false) {
                        alert('Status Updated Successfully... Hurray!');
                    }
                    if (data.success === true) {
                        alert('Status Updated Failed... Sad!');
                    }
                })
                .then(() => window.location.reload())
        }
        if (strings === 'Deactivate') {
            const statusOption = 'Deactivate';
            fetch(`https://softx-library-management.herokuapp.com/update-statue/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ statusOption })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success === false) {
                        alert('Status Updated Successfully... Hurray!');
                    }
                    if (data.success === true) {
                        alert('Status Updated Failed... Sad!');
                    }
                })
                .then(() => window.location.reload())
        }
    }

    const handleDelete = (id) => {
        fetch(`https://softx-library-management.herokuapp.com/delete-order/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                if (data.success === false) {
                    alert('Book Delete Success')
                }
                if (data.success === true) {
                    alert('Book Delete Fail')
                }
            })
            .then(() => window.location.reload())
    }
    return (
        <div className="list-table">
            <Table responsive className="w-100">
                <thead className="table-header">
                    <tr className="">
                        <th className="">Book Name</th>
                        <th className="ww-25">Author</th>
                        <th className="">Genre</th>
                        <th className="w-25">Release Date</th>
                        <th className="">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {adminService.length > 0 ? adminService.map(data =>
                        <tr key={data._id}>
                            <td>{data.bookName}</td>
                            <td>{data.author}</td>
                            <td>{data.genre}</td>
                            <td>{data.releaseDate}</td>
                            <td>
                                <div className="dropdown cursor-pointer">
                                    {data.statusOption === "Pending" || data.statusOption === "Activate" ?
                                        <span className={data.statusOption === 'Pending' ? 'text-danger' : 'text-success'}>
                                            {data.statusOption}
                                            <span className="ml-2">{downIcon}</span>
                                        </span> : ""
                                    }
                                    {data.statusOption === 'Deactivate' ?
                                        <span className="text-warning">
                                            {data.statusOption}
                                            <span className="ml-2">{downIcon}</span>
                                        </span> : ''
                                    }
                                    <div className="dropdown-content">
                                        {data.statusOption !== "Activate" ?
                                            <span className="d-block text-success "
                                                onClick={() => handleUpdate(`${data._id}`, "Activate")}>
                                                Activate
                                            </span> : ""
                                        }
                                        {data.statusOption !== "Deactivate" ?
                                            <span className="d-block text-warning "
                                                onClick={() => handleUpdate(`${data._id}`, "Deactivate")}>
                                                Deactivate
                                            </span> : ""
                                        }
                                        <span className="d-block text-danger mb2"
                                            onClick={() => handleDelete(`${data._id}`)}>
                                            Delete
                                        </span>
                                        <span className="d-block text-secondary mb2"
                                            onClick={() => handleClickShowPopup(`${data._id}`)}>
                                            Edit
                                        </span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ) : <tr>
                            <td>
                                <LoadingSpinner />
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={ids}
            />
        </div>
    );
};

function MyVerticallyCenteredModal(props) {
    console.log(props);
    const [formData, updateFormData] = useState({
        bookName: "",
        author: "",
        genre: "",
        releaseDate: "",
        // statusOption: "Pending",
        // bookImage: null
    });
    const getData = (e) => {
        updateFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    }
    // const getUploadFils = (e) => {
    //     updateFormData({ ...formData, [e.target.name]: e.target.files[0] })
    // }

    const onSubmits = (e) => {
        const formsData = new FormData();
        formsData.append("bookName", formData.bookName);
        formsData.append("author", formData.author);
        formsData.append("genre", formData.genre);
        formsData.append("releaseDate", formData.releaseDate);
        // formsData.append("statusOption", formData.statusOption);
        // formsData.append("bookImage", formData.bookImage);

        fetch(`https://softx-library-management.herokuapp.com/update-single-book/${props.id}`, {
            method: 'PATCH',
            body: formsData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert("Book Update Successfully... Hurray!")
                }
                if (data.success === false) {
                    alert("Book Not Updated... Sad!")
                }
            })
            .then(() => {
                window.location.reload();
            })
        e.preventDefault()
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Book Information
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="row bg-white p-4 m-3" onSubmit={e => onSubmits(e)}>
                    <label htmlFor="">Book Name:</label>
                    <Form.Control type="text" placeholder="Enter Book Name" name="bookName" required onBlur={(e) => getData(e)} />
                    <label htmlFor="">Author:</label>
                    <Form.Control type="text" placeholder="Enter Author Name" name="author" required onBlur={(e) => getData(e)} />
                    <label htmlFor="">Genre:</label>
                    <Form.Control type="text" placeholder="Enter Genre" name="genre" required onBlur={(e) => getData(e)} />
                    <label htmlFor="">Release Date:</label>
                    <Form.Control type="date" placeholder="Enter Release Date" name="releaseDate" required onBlur={(e) => getData(e)} />
                    <div className="col-md-12 mt-3 text-center">
                        <Button variant="success" type="submit" className="responsive-tablet-btn">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BookLists;