import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createRandomRobot, clearRobots } from '../../redux/robots/robotActions';

const RobotFactory = ({ robots, createRandomRobot, clearRobots }) => {
    useEffect(() => {
        clearRobots();
    }, []);

    const renderRobots = () => {


        return robots.robots.map((robot) => {
            return (
                <div key={robot._id} style={{ background: 'green', margin: '3rem' }}>
                    {robot.name}
                </div>
            )
        });
    }

    return (
        <>
            <h1>RobotFactory</h1>
            <div>
                <p>This magic button lets you create robot for yourself</p>
                <button
                    onClick={createRandomRobot}
                    disabled={robots.loading}
                >
                    Create
                </button>
                {renderRobots()}
            </div>

        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createRandomRobot: () => dispatch(createRandomRobot()),
        clearRobots: () => dispatch(clearRobots())
    }
}

const mapStateToProps = (state) => ({ robots: state.robots })


export default connect(mapStateToProps, mapDispatchToProps)(RobotFactory);