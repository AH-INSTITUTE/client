import React, { useContext } from 'react';
import './Css/Style.css'
import { Container } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import googleIcon from '../images/icons/google.png';
import { AuthContext } from './Auth';
import Navbars from '../Pages/ShearCompo/Navbars';
import Footer from '../Pages/ShearCompo/Footer';


const Login = () => {
    document.title = "Login-Pages";
    //get user login form auth.js file
    const auth = useContext(AuthContext);
    const { handleGoogleSignIn } = auth;

    //redirect to path settings
    const location = useLocation();
    const history = useHistory()
    let { from } = location.state || { from: { pathname: "/dashboard" } };

    //google sign in 
    const handGoogleSign = () => {

        handleGoogleSignIn()
            .then(r => {
                history.replace(from);
            })
    }


    return (
        <>
            <Navbars />
            <Container id="login" className="">
                <div className="row mt-5">
                    <div className="signed-in-option col-md-6 m-auto">
                        <div className="title">

                            <h3>Login With</h3>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <button className="login-sign-up-btn" onClick={() => handGoogleSign()}>
                                <span className="float-left pl-3 google-icon"><img src={googleIcon} alt="" /></span>
                                <span className="text-center mt-2 d-block">Continue with Google</span>
                            </button>
                        </div>
                        <div className="title-footer text-center py-2">
                            <p>Don't have account? <Link to="/" className="create-account">Create an account</Link> </p>
                        </div>
                    </div>
                </div>
            </Container>
            <div className='m-5'>
                <Footer />
            </div>
        </>
    );
};
export default Login;