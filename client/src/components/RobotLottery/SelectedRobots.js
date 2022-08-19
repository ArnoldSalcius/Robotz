import React from 'react'

const SelectedRobots = ({ selectedRobots, handleClick, isClaimed }) => {

    //isDisabled for button
    const isDisabled = selectedRobots.length < 3 || selectedRobots.length > 3;


    const renderSelected = () => {
        const rendered = selectedRobots.map((robot) => {
            return (
                <div key={"selected-" + robot._id} className='selectedRobot'>
                    {isClaimed ? <p>Claimed</p> : null}
                    <div>{robot.name}</div>
                </div>
            )
        });

        return rendered;

    }
    return (
        <div className='selectedContainer'>
            {isDisabled && <p>Please select 3 robots before claiming!</p>}

            <div className='selectedRobots'>
                {renderSelected()}
            </div>
            {
                (!isDisabled && !isClaimed) && <button onClick={(e) => handleClick(e)}>Get Robots</button>
            }
        </div>

    )
}

export default SelectedRobots