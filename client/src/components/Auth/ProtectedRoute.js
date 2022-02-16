import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ auth }) => {

    console.log(auth);
    return (
        !auth.user ? (<Navigate to='/login' />) :
            (<div>ProtectedRoute</div>)
    )
}


const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(ProtectedRoute);