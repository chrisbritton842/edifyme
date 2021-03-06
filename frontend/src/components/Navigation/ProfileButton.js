import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div className='dropdown'>
                <button className="dropdown-profile-btn" onClick={openMenu}>
                    <i className="fa-regular fa-user"></i>
                </button>
                {showMenu && (
                    <div className='profile-dropdown'>
                        <div>{user.username}</div>
                        <div>{user.email}</div>
                        <div className='menu-logout' onClick={logout}>
                            Log Out
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProfileButton;
