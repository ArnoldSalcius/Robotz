import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { clearRobots, getUserInfo } from '../../../redux/robots/robotActions';
import './UserInfo.css';

const UserInfo = ({ state, getUserInfo }) => {

    useEffect(() => {
        if (!state.robots.loading) {
            getUserInfo();
        }
    }, [state.robots.loading, getUserInfo]);

    return (
        <div className='userInfo'>
            <div>
                Credits: {state.robots.credits}

            </div>
            <div>
                Robots: {state.robots.robotNum}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => dispatch(getUserInfo()),
        clearRobots: () => dispatch(clearRobots())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);