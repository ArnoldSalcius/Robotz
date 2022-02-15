import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginPage from './components/Auth/LoginPage';

const App = () => {


    return (
        <Provider store={store}>
            <div>
                <LoginPage></LoginPage>
            </div>
        </Provider>
    )

}



export default App;