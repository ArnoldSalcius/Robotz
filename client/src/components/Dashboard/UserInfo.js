import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { clearRobots, getUserInfo } from '../../redux/robots/robotActions';

const UserInfo = ({ state, getUserInfo }) => {

    useEffect(() => {
        if (!state.robots.loading) {
            getUserInfo();
        }
    }, [state.robots.loading, getUserInfo]);

    return (
        <div>
            Credits: {state.robots.credits}
            Robots owned: {state.robots.robotNum}
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