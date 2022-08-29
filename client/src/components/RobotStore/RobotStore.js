import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RobotCard from '../RobotCard/RobotCard';
import './RobotStore.scss';
import { getStoreRobots, getMyRobots, buyRobot, sellRobot } from '../../redux/robots/robotActions';
import Ribbon from '../partials/Ribbon/Ribbon';
import { Link, useLocation } from 'react-router-dom';
import { GiTwoCoins } from 'react-icons/gi'
import Button from '../partials/Button/Button';





const RobotStore = ({ buyRobot, getRobots, getMyRobots, sellRobot, state }) => {

    const location = useLocation();
    let curTab = location.pathname.split('/')[2] || 'buy';

    const [tab, setTab] = useState(curTab);



    useEffect(() => {
        tab === 'buy' ? getRobots() : getMyRobots()
    }, [tab, getMyRobots, getRobots]);




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

    const colorScheme = tab === 'buy' ? 'secondary' : 'primary';
    const textCName = `store__buyText store__buyText--${colorScheme}`;

    const descrString = tab === 'buy' ? ['Buy', 'Store'] : ['Sell', 'Collection']

    return (
        <div className='store'>
            <div className='store__header'>
                <div className='store__title'>
                    Welcome to <span className={textCName}>Robot Store</span>!
                </div>
                <div className='store__description'>
                    <span className={textCName}>{descrString[0]}</span> Robots from <span className={textCName}>{descrString[1]}</span>

                </div>
                <div className='store__nav'>
                    <Link to={`./${tab}`}>

                        <Button color={colorScheme} size={'md'} onClick={(e) => handleTabChange(e)}>
                            {tab === 'buy' ? 'Go to Sell' : 'Go to Buy'}
                        </Button>
                    </Link>

                </div>
            </div>

            <div className='store__robots'>
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