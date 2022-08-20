import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className='home'>
            <div className='superH'>Robotz</div>
            <div className='container'>
                <div className='directions'>

                    <div>
                        <div>
                            Step1:
                        </div>
                        <div>
                            <a href='/register'>Register</a>/<a href='/login'>Login</a> to Robotz
                        </div>
                    </div>
                    <div>
                        <div>
                            Step2:
                        </div>
                        <div>

                            <a href='/lottery'>Win</a>, <a href='/store'>Buy</a> and <a href='/store'>Sell</a> coolest Robotz on Planet
                        </div>
                    </div>
                    <div>
                        <div>
                            Step3:
                        </div>
                        <div>
                            Enjoy and don't forget to follow me on <a href='#footer'>links</a> provided below
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home