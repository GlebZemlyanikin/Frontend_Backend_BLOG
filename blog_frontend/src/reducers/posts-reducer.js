const initialPostsState = {
    id: null,
    title: '',
    content: '',
};

export const postsReducer = (state = initialPostsState, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return { ...state, ...action.payload };
        case 'LOGOUT':
            return initialPostsState;
        default:
            return state;
    }
};
