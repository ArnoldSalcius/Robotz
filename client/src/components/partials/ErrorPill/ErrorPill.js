import React, { useEffect } from 'react';
import './ErrorPill.css';
import { VscError } from 'react-icons/vsc';

const ErrorPill = ({ error, time = 7, onComplete, id }) => {


    useEffect(() => {

        if (time === 0) {
            return;
        }
        if (!onComplete) {
            return;
        }
        setTimeout(() => {
            onComplete();
        }, time * 1000 || 1000);

    }, [onComplete, time]);



    if (!error) {
        return null;
    }

    return (
        <div className='errorPill'>
            <div className='errorIcon'>
                <VscError></VscError>

            </div>
            <div className='errorText'>
                {error || 'ErrorPill'}
            </div>
        </div>
    )
}

export default ErrorPill;