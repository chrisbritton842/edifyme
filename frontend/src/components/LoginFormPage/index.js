import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';
import { Modal } from '../../context/Modal'
import SignupFormPage from '../SignupFormPage';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);

    if (sessionUser) return (
        <Redirect to='/' />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    const handleDemo = () => {
        return dispatch(sessionActions.login({ credential: 'demo@demo.com', password: 'demouser'}))
    };

    return (
        <>

            <div className='page'>
                <div className='center-container'>
                    <div className='title-div'>
                        <div className='edifyme'>EdifyMe</div>
                        <div className='sub-text'>A place to share knowledge with classmates</div>
                    </div>
                    <span className='sub-heading'>

                    </span>
                    <div className='middle-form-section'>
                        <div className='left-middle'>
                            <div className='sign-up-div'>
                                <button className='sign-up-btn' onClick={() => setShowModal(true)}>Sign up</button>
                            </div>
                            <div className='demo-div'>
                                <button className='demo-btn' onClick={handleDemo}>Demo</button>
                            </div>
                        </div>
                        <div className='right-middle'>
                            <form onSubmit={handleSubmit}>
                                <ul>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                                </ul>
                                <div className='login-email-box'>
                                    <div className='login-email-label'>
                                        <label>Username or Email</label>
                                    </div>
                                    <div className='login-email-input'>
                                        <input className='email-input-field' type='text' value={credential} onChange={e => setCredential(e.target.value)} required />
                                    </div>
                                </div>
                                <div className='login-password-box'>
                                    <div className='login-password-label'>
                                        <label>Password</label>
                                    </div>
                                    <div className='login-password-input'>
                                        <input className='password-input-field' type='password' value={password} onChange={e => setPassword(e.target.value)} required />
                                    </div>
                                </div>
                                <div className='login-button-div'>
                                    <button type='submit'>Log In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='bottom-form-section'>

                    </div>
                </div>
            </div>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupFormPage onClose={() => setShowModal(false)}/>
                </Modal>
            )}

        </>

    );
}

export default LoginFormPage;
