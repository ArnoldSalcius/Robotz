import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ auth, children = null }) => {
    const location = useLocation();

    if (auth.loading) {
        return null;
    }
    return auth.user ? children : <Navigate replace to='/login' state={{ from: location }} />
}


const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(ProtectedRoute);