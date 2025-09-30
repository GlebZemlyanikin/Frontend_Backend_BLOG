import { setPostData } from './set-post-data';
import { request } from '../utils/request';

export const loadPostAsync = (postId) => (dispatch) =>
    request(`/api/posts/${postId}`, 'GET').then((postData) => {
        if (postData.data) {
            dispatch(setPostData(postData.data));
        }

        return postData;
    });
