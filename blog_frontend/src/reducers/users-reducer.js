const initialUsersState = {
    id: null,
    name: '',
    email: '',
};

export const usersReducer = (state = initialUsersState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, ...action.payload };
        case 'LOGOUT':
            return initialUsersState;
        default:
            return state;
    }
};
