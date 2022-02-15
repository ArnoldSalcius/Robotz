import { useState } from 'react';

const initialState = {
    username: '',
    password: ''
}

const LoginPage = function () {

    const [input, setInput] = useState(initialState);
    const [showPass, setShowPass] = useState(false);

    const handleInput = (e) => {
        const val = e.target.value;
        const field = e.target.id;
        setInput({ ...input, [field]: val });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h2>Login</h2>
            <form>
                <label htmlFor='username'>Username</label>
                <input id='username' name='username' value={input.username} onChange={handleInput}></input>
                <label htmlFor='password'>Password</label>
                <input id='password' name='password' type={showPass ? 'text' : 'password'} value={input.password} onChange={handleInput}></input>
                <input type='checkbox' name='showPass' id='showPass' onClick={() => setShowPass(!showPass)}></input>
                <label htmlFor='showPass' >Show password</label>
                <button onClick={handleSubmit}>Login</button>
            </form>

        </div>
    )




}


export default LoginPage;