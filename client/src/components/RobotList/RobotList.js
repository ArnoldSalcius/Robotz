import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyRobots, clearRobots } from '../../redux/robots/robotActions';

import RobotCard from '../RobotCard/RobotCard';
import './RobotList.css';

const RobotList = ({ robots, getMyRobots, clearRobots }) => {


    useEffect(() => {
        getMyRobots();
    }, [getMyRobots]);

    const renderRobots = () => {
        return robots.robots.map((robot) => {
            return (

                <RobotCard key={robot._id} robot={robot} />
            )
        })
    }

    return (
        <div>
            <h1>My Robot Collection </h1>
            <div className='robotList'>
                {renderRobots()}

            </div>
        </div>
    )
}

const mapStateToPros = ({ robots }) => ({ robots });

const mapDispatchToProps = (dispatch) => {
    return {
        getMyRobots: () => dispatch(getMyRobots()),
        clearRobots: () => dispatch(clearRobots())
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(RobotList);