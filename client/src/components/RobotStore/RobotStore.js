import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RobotCard from '../RobotCard/RobotCard';
import './RobotStore.css';
import { getStoreRobots, getMyRobots, buyRobot, sellRobot } from '../../redux/robots/robotActions';
import Ribbon from '../partials/Ribbon/Ribbon';
import { Link, useLocation } from 'react-router-dom';
import { GiTwoCoins } from 'react-icons/gi'




const tabs = [
    {
        name: 'buy',
        stringName: 'Buy Robots from store'
    },
    {
        name: 'sell',
        stringName: 'Sell Robots from store'
    }
];

const RobotStore = ({ buyRobot, getRobots, getMyRobots, sellRobot, state }) => {

    const location = useLocation();
    let curTab = location.pathname.split('/')[2] || 'buy';

    const [tab, setTab] = useState(curTab);

    useEffect(() => {
        tab === 'buy' ? getRobots() : getMyRobots()
    }, [tab, getMyRobots, getRobots])

    const handleTabChange = (e) => {
        setTab(tab === 'buy' ? 'sell' : 'buy');
    }

    const handleTransaction = (id) => {
        tab === 'buy' ? buyRobot(id) : sellRobot(id);
    }

    const renderRobots = () => {
        return state.robots.robots.map((robot) => {
            return (
                <div className='storeRobot' key={robot._id} onClick={() => { handleTransaction(robot._id) }}>
                    <RobotCard store robot={robot}>
                        <Ribbon type={tab === 'sell' ? 'secondary' : 'primary'}>
                            {robot.price}
                            < GiTwoCoins />
                        </Ribbon>
                    </RobotCard>


                </div>
            )
        });
    }


    return (
        <div className='storeContainer'>
            <div>
                <Link to={`./${tab}`}>
                    <button onClick={(e) => handleTabChange(e)}>{tab === 'buy' ? 'Go to Sell' : 'Go to Buy'}</button>
                </Link>

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