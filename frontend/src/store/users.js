import { csrfFetch } from './csrf';

const SET_USERS = 'users/setUsers';

const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    };
};

export const readUsers = () => async (dispatch) => {
    const allUsers = await csrfFetch('/api/users')

    const data = await allUsers.json();
    dispatch(setUsers(data));
    return allUsers;
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_USERS:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        default:
            return state;
    }
};

export default usersReducer;
