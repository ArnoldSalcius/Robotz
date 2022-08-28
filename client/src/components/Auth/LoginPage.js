import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loginUser, clearErrors, loginUserFail } from '../../redux/auth/authActions';
import { Navigate, useLocation } from 'react-router-dom';
import './LoginPage.scss';

const initialState = {
    username: '',
    password: ''
}


const LoginPage = function ({ register, auth, loginUser, clearAuthErrors, dispatchAuthError }) {

    const [input, setInput] = useState(initialState);
    const [showPass, setShowPass] = useState(false);
    const location = useLocation();
    useEffect(() => {
        return clearAuthErrors;
        //ok to have clearAuthErrors in dependency array?
    }, [register, clearAuthErrors]);

    //used to check if passwords match (only for register)
    const [repassword, setRepassword] = useState('');



    const isFieldError = (fieldName) => {
        if (auth.error) {
            if (auth.error.fields) {
                return auth.error.fields.find(field => Object.keys(field).includes(fieldName));
            }
        }
        return false;
    }

    const isEmailError = isFieldError('email');
    const isPasswordError = isFieldError('password');
    const isUsernameError = isFieldError('username');

    const handleInput = (e) => {
        const val = e.target.value;
        const field = e.target.id;
        removeFieldError(e);
        setInput({ ...input, [field]: val });
    }

    const navigateTo = (() => {
        if (location.state && location.state.from) {
            return location.state.from.pathname
        } else {
            return '/dashboard';
        }
    })();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (register) {
            if (repassword === input.password) {
                console.log('Password match, reust sent');
                loginUser(input, register);
            } else {
                console.log('eror passwords not match');
                dispatchAuthError({ message: 'Passwords do not match', fields: [{ password: 'Passwords do not match' }] })
            }
        } else {
            await loginUser(input, register);
        }
        setRepassword('');
        setInput({ ...input, 'password': '' });
    }

    const removeFieldError = (e) => {
        const field = e.target.name;
        if (auth.error && auth.error.fields) {
            //Send same error but with
            const newFields = auth.error.fields.filter((el) => !Object.keys(el).includes(field));
            if (newFields.length) {
                dispatchAuthError({ ...auth.error, fields: newFields })
            } else {
                clearAuthErrors();
            }
        }

    }

    //Additional fields for register
    const renderRegister = () => {


        //Add email field to state
        if (input.email === undefined) setInput({ ...input, email: '' });
        //Check if email field has error


        return (
            <>
                <div className="auth__inputGroup">
                    <label htmlFor='repassword'>Repeat Password</label>
                    <input id='repassword' type='password' name='repassword' value={repassword} onChange={(e) => setRepassword(e.target.value)}></input>
                </div>
                <div className="auth__inputGroup">
                    <label htmlFor='email'>Email</label>
                    <input
                        style={isEmailError ? { border: '5px solid red' } : null}
                        id='email'
                        name='email'
                        value={input.email}
                        onChange={handleInput}
                        placeholder='Anything here...'
                    />
                </div>
                <div className='auth__inputError'>
                    {isEmailError && isEmailError.email}
                </div>
            </>
        )
    }


    return (
        auth.user ? <Navigate to={navigateTo} /> :
            (<div className='auth'>
                <h2 className='auth__header'>{register ? "Register" : "Login"}</h2>
                <form className='auth__form'>
                    <div className="auth__inputGroup">
                        <label htmlFor='username'>Username</label>

                        <input
                            className={`auth__input${isUsernameError ? '--error' : ''}`}
                            autoComplete='off'
                            id='username'
                            name='username'
                            placeholder='Username...'
                            value={input.username}
                            onChange={handleInput}
                        />
                    </div>
                    <div className='auth__inputError'>
                        {isUsernameError && isUsernameError.username}
                    </div>
                    <div className='auth__inputGroup'>
                        <label htmlFor='password'>Password</label>
                        <input
                            style={isPasswordError ? { border: '5px red solid' } : null}
                            id='password'
                            name='password'
                            placeholder='Password...'
                            type={showPass ? 'text' : 'password'}
                            value={input.password}
                            onChange={handleInput}
                        >

                        </input>
                        <div className='auth__inputError'>
                            {isPasswordError && isPasswordError.password}

                        </div>
                        <div>
                            <input
                                type='checkbox'
                                name='showPass'
                                id='showPass'
                                onClick={() => setShowPass(!showPass)}>
                            </input>
                            <label htmlFor='showPass' >Show password</label>
                        </div>
                    </div>

                    {register && renderRegister()}

                    <button onClick={handleSubmit}>Login</button>
                    <div className="auth__error">
                        {auth.error && <p>{auth.error.message}</p>}

                    </div>

                </form>

            </div>)
    )


}


const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (data, register) => dispatch(loginUser(data, register)),
        clearAuthErrors: () => dispatch(clearErrors()),
        dispatchAuthError: (err) => dispatch(loginUserFail(err))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);