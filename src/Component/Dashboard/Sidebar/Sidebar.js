import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTaxi, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ExtraDataContext } from '../../ExtraData/ExtraData';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const Sidebar = () => {
    const ExtraData = useContext(ExtraDataContext)
    const { ClickShowData, seeData, setSeeData, getEmail, Admin, setAdmin } = ExtraData;
    const shoppingCart = <FontAwesomeIcon icon={faShoppingCart} />
    const taxiIcon = <FontAwesomeIcon icon={faTaxi} />
    const plusIcon = <FontAwesomeIcon icon={faPlus} />

    useEffect(() => {
        fetch(`https://softx-library-management.herokuapp.com/check-admin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: getEmail })
        })
            .then(res => res.json())
            .then(data => {
                if (data.admin === true) {
                    setAdmin(true)
                    setSeeData({ BookList: true })
                } else if (data.admin === false) {
                    setAdmin(false)
                    setSeeData({ order: true })
                }
            })
    }, [getEmail, setSeeData, setAdmin])

    return (
        <div className="pt-5">
            {Admin == null ?
                <LoadingSpinner />
                :
                <>
                    { Admin === true ? <>
                        <p
                            className={seeData.BookList === true ? "m-2 text-success" : "m-2"}
                            onClick={() => ClickShowData("book-list-admin")}>
                            <span className="mr-2">{taxiIcon}</span>
                            Book List
                        </p>
                        <p
                            className={seeData.addBook === true ? "m-2 text-success" : "m-2"}
                            onClick={() => ClickShowData("add-book")}>
                            <span className="mr-2">{plusIcon}</span>
                            Add Book
                        </p>
                    </>
                        :
                        <>
                            <p
                                className={seeData.order === true ? "m-2 text-success" : "m-2"}
                                onClick={() => ClickShowData("order")}>
                                <span className="mr-2">{shoppingCart}</span>
                             Order
                        </p>
                            <p
                                className={seeData.serviceClient === true ? "m-2 text-success" : "m-2"}
                                onClick={() => ClickShowData("services-list")}>
                                <span className="mr-2">{taxiIcon}</span>
                            Services List
                        </p>
                        </>
                    }
                </>
            }
        </div>
    );
};

export default Sidebar;