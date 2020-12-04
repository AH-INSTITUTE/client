import React, { createContext, useState } from 'react';
import { } from 'react-router-dom';

let Context = null;
const { Provider, Consumer } = Context = createContext();

const ExtraDataProvider = (props) => {

    //dashboard true false condition
    const [seeData, setSeeData] = useState({
        order: false,
        serviceClient: false,
        BookList: false,
        review: false,
        addService: false
    })
    // console.log(seeData, "Extra")
    const ClickShowData = (e) => {
        if (e === "order") {
            setSeeData({
                order: true,
                serviceClient: false,
                BookList: false,
                review: false,
                addBook: false,
            })
        }
        if (e === "book-list-admin") {
            setSeeData({
                order: false,
                serviceClient: false,
                BookList: true,
                review: false,
                addBook: false
            })
        }
        if (e === "services-list") {
            setSeeData({
                order: false,
                serviceClient: true,
                BookList: false,
                review: false,
                addBook: false
            })
        }
        if (e === "add-book") {
            setSeeData({
                order: false,
                serviceClient: false,
                BookList: false,
                review: false,
                addBook: true
            })
        }
    }


    //check admin
    const getEmail = sessionStorage.getItem('user');
    const [Admin, setAdmin] = useState(true);

    return (
        <Provider value={
            {
                seeData,
                getEmail,
                Admin,
                setAdmin,
                setSeeData,
                ClickShowData,
            }
        }>
            {props.children}
        </Provider>
    )

}


export { ExtraDataProvider, Consumer as UserConsumer, Context as ExtraDataContext };