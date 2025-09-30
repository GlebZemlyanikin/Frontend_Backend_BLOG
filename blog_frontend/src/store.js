import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer } from './reducers/user-reducer';
import { usersReducer } from './reducers/users-reducer';
import { postReducer } from './reducers/post-reducer';
import { postsReducer } from './reducers/posts-reducer';
import { appReducer } from './reducers/app-reducer';

const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    users: usersReducer,
    post: postReducer,
    posts: postsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);
