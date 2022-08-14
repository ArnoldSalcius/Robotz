import React from 'react';
import './RobotCard.css';

const RobotCard = ({ robot, select, handleClick, selected }) => {
    return (

        <div className={`robotCard `}>
            <div className='robotTitle'>
                <h2>{robot.name}</h2>
            </div>
            <div className='robotImg'>
                <img alt='wow' src={'https://robohash.org/' + robot._id} draggable="false" ></img>
            </div>
            <div className='robotStats'>
                <h3>Stats:</h3>
                <hr />
                <ul>
                    <li>Rarity: {robot.rarity}</li>
                    <li>Rating: {robot.rating}</li>
                </ul>
            </div>
        </div>

    )
}

export default RobotCard