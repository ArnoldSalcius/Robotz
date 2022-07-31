import React from 'react';
import Spinner from '../partials/Timer/Spinner';
import './Loading.css';

const Loading = ({ msg }) => {

    return (
        <div>
            <div className='loadingScreen'>
            </div>
            <div className='loadingContent'>
                <Spinner />
                <h1>{msg}</h1>
            </div>
            <div>
            </div>
        </div>
    );
}

export default Loading;