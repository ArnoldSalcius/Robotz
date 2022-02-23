import React, { useEffect, useState } from 'react';
import LoginPage from './components/Auth/LoginPage';
import {
    Routes,
    Route
} from "react-router-dom";
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { connect } from 'react-redux';
import { verifyToken } from './redux/auth/authActions';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';

const App = ({ auth, verifyToken }) => {

    useEffect(() => {
        if (localStorage.getItem('token')) {
            verifyToken()
        }

    }, []);

    useEffect(() => {
        console.log(auth);
    })


    return (

        <div>
            <Nav auth={auth} />


            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<LoginPage register />} />
                <Route
                    path='/dashboard'
                    element={
                        <ProtectedRoute>
                        </ProtectedRoute>
                    }
                />
            </Routes>



        </div>
    )

}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        verifyToken: () => dispatch(verifyToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);