import { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const Spinner = () => {


    const [rotation, setRotation] = useState('clockwise');

    const onComplete = () => {
        rotation === 'clockwise' ? setRotation('counterclockwise') : setRotation('clockwise');
        return {
            shouldRepeat: true,
        }
    }

    return (
        <CountdownCircleTimer
            isPlaying
            duration={1}
            colors={"#8A9A5B"}
            trailColor={'grey'}
            onComplete={onComplete}
            rotation={rotation}
        >
        </CountdownCircleTimer>
    )

}
export default Spinner;