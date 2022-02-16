import React, { useEffect, useState } from 'react';

import LoginPage from './components/Auth/LoginPage';
import {
    Routes,
    Route
} from "react-router-dom";
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { connect } from 'react-redux';

const App = ({ auth }) => {

    return (

        <div>
            {
                auth.loading ? 'LOADING' : (
                    <Routes>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<LoginPage register />} />
                        <Route path='/dashboard' element={<ProtectedRoute />} />
                    </Routes>
                )
            }


        </div>
    )

}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps)(App);