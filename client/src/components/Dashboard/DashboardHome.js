import React from 'react';
import './DashboardHome.scss';
import { useSelector } from 'react-redux';

const DashboardHome = () => {

    const { robots, credits } = useSelector(state => ({ robots: state.robots.robotNum, credits: state.robots.credits }));

    return (
        <div className='dashHome'>
            <div className='dashHome__header'>
                Your Robotz Overview
            </div>
            <div className='dashInfo'>
                <div className='dashInfo__list'>
                    <div className='dashInfo__item dashInfo__item--happy'>
                        <div className='dashInfo__header'>
                            Robots Owned
                        </div>
                        <div className='dashInfo__info'>
                            {robots}
                        </div>
                    </div>
                    <div className='dashInfo__item dashInfo__item--good'>
                        <div className='dashInfo__header'>
                            Your Credits
                        </div>
                        <div className='dashInfo__info'>
                            {credits}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default DashboardHome