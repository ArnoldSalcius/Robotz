import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {


    return (
        <Provider store={store}>
            <div>
                <Login />
            </div>
        </Provider>
    )

}



export default App;