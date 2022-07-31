import React, { useEffect } from 'react';
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
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './Footer/Footer';

const App = ({ auth, verifyToken }) => {

    useEffect(() => {
        verifyToken()
    }, []);



    return (

        <>
            <Nav auth={auth} />


            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<LoginPage register />} />
                <Route
                    path='/dashboard'
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/mylist'
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/store'
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/lottery'
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            <Footer />


        </>
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