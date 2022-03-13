import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';
import { ReactComponent as ExitLogo } from '../DisplayPage/exit.svg';

const SignupFormPage = ({ onClose }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }

        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <>
            <div className='signup-modal-container'>
                <div className='signup-top-band'>
                    <button className='signup-close-btn' onClick={onClose}>
                        <ExitLogo />
                    </button>
                </div>
                <div className='signup-title-band'>
                    <div className='signup-title-text'>Sign up</div>
                </div>
                <div className='signup-form-section'>
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div className='inner-signup-form-section'>
                            <div className='signup-username-box'>
                                <div className='signup-label'>Username</div>
                                <div className='signup-input-box'>
                                    <input
                                        className='signup-input'
                                        type='text'
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='signup-email-box'>
                                <div className='signup-label'>Email</div>
                                <div className='signup-input-box'>
                                    <input
                                        className='signup-input'
                                        type='text'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='signup-password-box'>
                                <div className='signup-label'>Password</div>
                                <div className='signup-input-box'>
                                    <input
                                        className='signup-input'
                                        type='password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='signup-confirm-password-box'>
                                <div className='signup-label'>Confirm Password</div>
                                <div className='signup-input-box'>
                                    <input
                                        className='signup-input'
                                        type='password'
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='signup-outer-bottom-band'>
                            <div className='signup-bottom-band'>
                                <button className='signup-submit-btn' type='submit'>
                                    <div className='submit-next-text'>Next</div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignupFormPage;
