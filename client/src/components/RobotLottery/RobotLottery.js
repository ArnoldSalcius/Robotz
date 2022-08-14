import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { claimRobotLottery, getLotteryRobots, clearTimer, clearRobots } from '../../redux/robots/robotActions';
import Timer from '../partials/Timer/Timer';
import { timeLeft } from '../../utils/date';
import RobotCard from '../RobotCard/RobotCard';
import './RobotLottery.css';
import SelectedRobots from './SelectedRobots';

const RobotLottery = ({ robots, getLotteryRobots, claimRobotLottery, clearTimer, clearRobots }) => {

    const [selectedRobots, setSelectedRobots] = useState([]);
    const [isClaimed, setIsClaimed] = useState(false);



    const timer = timeLeft(robots.timer);
    //check if timer needed
    const isTimer = !!timer;

    useEffect(() => {

        if (robots.timer === null && !robots.loading) {
            const fetchData = async () => {
                setSelectedRobots([]);
                setIsClaimed(false);
                await getLotteryRobots();
            }
            fetchData();

        }

    }, [robots.timer, getLotteryRobots]);

    useEffect(() => {
        if (robots.errors.length > 0 && selectedRobots.length) {
            setIsClaimed(false);
            setSelectedRobots([]);
        }
    }, [robots.errors.length, selectedRobots.length]);


    const handleRobotClick = (robot) => {
        //add or remove from array
        //check if there, remove if is, add if isnt
        const found = selectedRobots.findIndex((el) => robot._id === el._id);
        if (found === -1 && selectedRobots.length < 3) {
            setSelectedRobots([...selectedRobots, robot])
        } else {
            const newRobots = selectedRobots.filter(el => el._id !== robot._id);
            setSelectedRobots(newRobots)
        }
    }

    const renderRobots = () => {
        return robots.robots.map((robot) => {
            const found = selectedRobots.find((selected) => {
                return selected._id === robot._id;
            });
            const isOut = !found && selectedRobots.length > 2;

            return (
                <div className='selectRobot' key={robot._id} onClick={() => handleRobotClick(robot)}>
                    <div className={`${found ? "" : "opacity"} ${isOut ? "out" : ""}`}>
                        <RobotCard robot={robot} />
                    </div>
                    <div className='selectRobot'>
                        <button disabled={!found && selectedRobots.length > 2} onClick={() => handleRobotClick(robot)}>
                            {
                                found ? "Unselect" : "Select"
                            }
                        </button>
                    </div>
                </div>

            )
        })
    }

    const handleSelectedClick = (e) => {
        e.preventDefault();
        //Send robots to db
        const robotIds = selectedRobots.map(robot => robot._id);
        setIsClaimed(true);
        claimRobotLottery(robotIds);

    }

    const handleTimer = () => {
        clearTimer();
        setSelectedRobots([]);
    }



    return (
        <div>
            <h1>Robot Lottery</h1>

            {isTimer
                ? <Timer timer={timer} done={handleTimer} />
                : (<div className='lotteryList'>
                    {renderRobots()}
                </div>)
            }

            <SelectedRobots selectedRobots={selectedRobots} handleClick={handleSelectedClick} isClaimed={isClaimed} />
        </div>
    )
}

const mapStateToPros = ({ robots }) => ({ robots });

const mapDispatchToProps = (dispatch) => {
    return {
        getLotteryRobots: () => dispatch(getLotteryRobots()),
        claimRobotLottery: (robots) => dispatch(claimRobotLottery(robots)),
        clearTimer: () => dispatch(clearTimer()),
        clearRobots: () => dispatch(clearRobots())
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(RobotLottery);