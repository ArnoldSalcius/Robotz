import React from 'react'
import Button from '../partials/Button/Button';

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
        selectedRobots.length != 0 &&
        (<div className='selectedContainer'>
            <div className='selectedMessage'>
                {isDisabled && <p>Please select 3 robots before claiming!</p>}

            </div>

            <div className='selectedClaim'>

                <div className='selectedRobots'>
                    {renderSelected()}

                </div>
                {
                    (!isDisabled && !isClaimed) && <Button color={'primary'} size={'md'} onClick={(e) => handleClick(e)}>Get Robots</Button>
                }
            </div>

        </div>)

    )
}

export default SelectedRobots