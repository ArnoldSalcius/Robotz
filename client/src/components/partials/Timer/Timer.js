import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const Timer = ({ timer, done }) => (
    <CountdownCircleTimer
        isPlaying
        //MUST BE SAME AS LOT_TIMER on server
        duration={45}
        colors={'green'}
        onComplete={done}
        initialRemainingTime={Math.ceil(timer / 1000)}
    >
        {({ remainingTime }) => {
            return (
                <div>
                    <h1>
                        {remainingTime}

                    </h1>
                </div>
            )
        }}
    </CountdownCircleTimer>
)


export default Timer;