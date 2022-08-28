import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/auth/authActions';
import { useNavigate } from 'react-router-dom';
import './Nav.scss';

const Nav = ({ auth, logoutUser }) => {

    const isAuth = !!auth.user;
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    }

    return (
        <header className='nav'>
            <div className='nav-title'>
                Robotz
            </div>
            <div className='nav-links'>
                <div className='navLink'>
                    <Link to='/'>Home</Link >
                </div>
                {
                    isAuth ? (
                        <>
                            <div className='navLink'>
                                <Link to='/dashboard'>Robots</Link >
                            </div>
                            <div className='navLink'>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='navLink'>
                                <Link to='/register'>Register</Link >
                            </div>

                        </>
                    )
                }
            </div>

            <div className='nav-right'>
                {isAuth ?
                    (
                        <div className='nav-user'>
                            {auth.user.username[0].toUpperCase()}
                        </div>
                    ) : (
                        <div className='navLink'>
                            <Link to='/login'>Login</Link >
                        </div>
                    )}

            </div>


        </header>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(null, mapDispatchToProps)(Nav);