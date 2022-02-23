import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ auth, children = null }) => {
    console.log('i ran');
    return auth.user ? children : <Navigate to='/login' />
}


const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(ProtectedRoute);