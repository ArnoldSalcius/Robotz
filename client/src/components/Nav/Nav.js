import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/auth/authActions';

const Nav = ({ auth, logoutUser }) => {

    const handleLogout = () => {

    }



    return (
        <div>
            <div>
                Nav
            </div>
            <div>
                <Link to='/'>Home</Link >
            </div>
            {
                auth.user ? (
                    <>
                        <div>
                            <Link to='/dashboard'>Dashboard</Link >
                        </div>
                        <div>
                            <button onClick={logoutUser}>Logout</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <Link to='/login'>Login</Link >
                        </div>
                        <div>
                            <Link to='/register'>Register</Link >
                        </div>

                    </>
                )
            }

        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(null, mapDispatchToProps)(Nav);