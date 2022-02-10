import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Form from './components/partials/Form';

const App = () => {


    return (
        <Provider store={store}>
            <div>
                <Form>
                    <input></input>
                    <input></input>
                </Form>
            </div>
        </Provider>
    )

}



export default App;