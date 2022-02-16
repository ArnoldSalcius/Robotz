import { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/auth/authActions';
import { Navigate } from 'react-router-dom'

const initialState = {
    username: '',
    password: ''
}


const LoginPage = function ({ register, auth, loginUser }) {

    const [input, setInput] = useState(initialState);
    const [showPass, setShowPass] = useState(false);

    console.log(auth);

    //used to check if passwords match (only for register)
    const [repassword, setRepassword] = useState('');


    const handleInput = (e) => {
        const val = e.target.value;
        const field = e.target.id;
        setInput({ ...input, [field]: val });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (register) {
            if (repassword === input.password) {
                console.log('Password match, reust sent');
                loginUser(input, register);
            } else {
                console.log('eror passwords not match');
            }
        } else {
            console.log('request sent for login');
            loginUser(input, register);
        }
        console.log(input);

    }

    //Additional fields for register
    const renderRegister = () => {
        //Add email field to state
        if (input.email === undefined) setInput({ ...input, email: '' });

        return (
            <>
                <label htmlFor='repassword'>Repeat Password</label>
                <input id='repassword' type='password' name='repassword' value={repassword} onChange={(e) => setRepassword(e.target.value)}></input>
                <label htmlFor='email'>Email</label>
                <input id='email' name='email'></input>
            </>
        )
    }

    return (
        auth.user ? (<Navigate to='/dashboard' />) :
            (<div>
                <h2>Login</h2>
                <form>
                    <label htmlFor='username'>Username</label>
                    <input id='username' name='username' value={input.username} onChange={handleInput}></input>
                    <label htmlFor='password'>Password</label>
                    <input id='password' name='password' type={showPass ? 'text' : 'password'} value={input.password} onChange={handleInput}></input>
                    <input type='checkbox' name='showPass' id='showPass' onClick={() => setShowPass(!showPass)}></input>
                    <label htmlFor='showPass' >Show password</label>
                    {register && renderRegister()}

                    <button onClick={handleSubmit}>Login</button>
                </form>

            </div>)
    )


}


const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (data, register) => dispatch(loginUser(data, register))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);