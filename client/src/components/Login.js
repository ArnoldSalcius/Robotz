import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../redux/auth/authActions';

const Login = ({ loginUser, state }) => {

    const [fields, setFields] = useState({ username: '', password: '' });
    const handleField = (e) => {

        setFields({
            ...fields,
            [e.target.id]: e.target.value
        })
    }

    const handleRegister = async () => {
        if (fields.username && fields.password) {

            try {
                loginUser(fields);

            } catch (e) {
                console.log('erioriux');
                console.log(e.response.data);
            }

        }
    }

    return state.loading ? (<h1>Loading</h1>) : (
        <div>
            <form onSubmit={(e) => { e.preventDefault() }}>
                <label htmlFor='username'>Username</label>
                <input id='username' value={fields.username} onChange={handleField}></input>
                <br></br>
                <label htmlFor='password' value={fields.password} onChange={handleField}>Password</label>
                <input id='password' value={fields.password} onChange={handleField}></input>
                <button type='submit'>Login</button>
                <button onClick={handleRegister}>Register</button>
            </form>
            {state.error || null}
        </div>
    )
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (data) => dispatch(loginUser(data))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Login);