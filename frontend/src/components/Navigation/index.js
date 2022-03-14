import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
import './Navigation.css';
import { ReactComponent as HomeIcon } from './home.svg';

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    }

    else {
        sessionLinks = (
            <>
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className='outer-nav-bar-div'>
            <div>
                <NavLink exact to='/'>
                    <HomeIcon className='home-icon'/>
                </NavLink>
            </div>
            <div>
            {isLoaded && sessionLinks}
            </div>
        </div>
    );
};

export default Navigation;
