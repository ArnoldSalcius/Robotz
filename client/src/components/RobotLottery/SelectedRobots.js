import React from 'react'

const SelectedRobots = ({ selectedRobots, handleClick, isClaimed }) => {

    //isDisabled for button
    const isDisabled = selectedRobots.length < 3 || selectedRobots.length > 3;


    const renderSelected = () => {
        const rendered = selectedRobots.map((robot) => {
            return (
                <div key={"selected-" + robot._id}>
                    {isClaimed ? <h1>Claimed</h1> : null}
                    <h3>{robot.name}</h3>
                </div>
            )
        });

        if (rendered.length) {
            return (
                <div id="selected-list">
                    {isDisabled && <p>Please select 3 robots before claiming!</p>}
                    {rendered}
                    {
                        (!isDisabled && !isClaimed) && <button onClick={(e) => handleClick(e)}>Get Robots</button>
                    }

                </div>
            )
        }
        return null;

    }
    return (
        <div className='selectedRobots'>
            {renderSelected()}
        </div>
    )
}

export default SelectedRobots