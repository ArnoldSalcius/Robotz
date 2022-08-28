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
            <div className='nav__title'>
                Robotz
            </div>
            <div className='navLinks'>
                <Link to='/'>
                    <div className='navLinks__link'>
                        Home
                    </div>
                </Link >
                {
                    isAuth ? (
                        <>
                            <Link to='/dashboard'>
                                <div className='navLinks__link'>
                                    Robots
                                </div>
                            </Link >
                            <div className='navLinks__link' onClick={handleLogout}>
                                Logout
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to='/register'>
                                <div className='navLinks__link'>
                                    Register
                                </div>
                            </Link >
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
                        <Link to='/login'>
                            <div className='navLinks__link'>
                                Login
                            </div>
                        </Link >
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