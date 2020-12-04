import React from 'react';
import Books from '../ShearCompo/Books';
import Footer from '../ShearCompo/Footer';
import Header from '../ShearCompo/Header';
import './Home.css';

const Home = () => {
    document.title = "Creative-Agency Home";
    return (
        <>
            <Header />
            <main id="home-main" className="container">
                <Books />
            </main>
            <Footer />
        </>
    );
};

export default Home;