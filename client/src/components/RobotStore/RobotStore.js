import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RobotCard from '../RobotCard/RobotCard';
import './RobotStore.css';
import { getStoreRobots, getMyRobots, buyRobot, sellRobot } from '../../redux/robots/robotActions';

const RobotStore = ({ buyRobot, getRobots, getMyRobots, sellRobot, state }) => {

    const [tab, setTab] = useState('store');

    useEffect(() => {
        tab === 'store' ? getRobots() : getMyRobots()
    }, [tab, getMyRobots, getRobots])

    const handleTabChange = (e) => {
        console.log(e.target.value);
        setTab(tab === 'store' ? 'my' : 'store');
    }

    const handleTransaction = (id) => {
        tab === 'store' ? buyRobot(id) : sellRobot(id);
    }

    const renderRobots = () => {
        return state.robots.robots.map((robot) => {
            return (
                <div className='storeRobot' key={robot._id} onClick={() => { handleTransaction(robot._id) }}>
                    <RobotCard robot={robot} />


                </div>
            )
        });
    }


    return (
        <div className='storeContainer'>
            <div>
                <button value={tab === 'store' ? 'my' : 'store'} onClick={(e) => handleTabChange(e)}>{tab === 'store' ? 'Mine' : 'Store'}</button>
            </div>
            <div className='storeRobots'>
                {renderRobots()}

            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        buyRobot: (robot) => dispatch(buyRobot(robot)),
        getRobots: () => dispatch(getStoreRobots()),
        getMyRobots: () => dispatch(getMyRobots()),
        sellRobot: (robot) => dispatch(sellRobot(robot))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RobotStore);