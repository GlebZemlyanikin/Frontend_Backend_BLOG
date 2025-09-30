import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { PostContent } from './components/post-content/post-content';
import { Comments } from './components/comments/comments';
import { Error } from '../../components/error/error';
import { loadPostAsync } from '../../action/load-post-async';
import { selectPost } from '../../selectors/select-post';
import { PostForm } from './components/post-form/post-form';
import { RESET_POST_DATA } from '../../action/reset-post-data';
import { ROLE } from '../../constants/role';
import { PrivateContent } from '../../components/private-content/private-content';

const PostContainer = ({ className }) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const params = useParams();
    const post = useSelector(selectPost);
    const isNew = !!useMatch('/post');
    const isEdit = !!useMatch('/post/:id/edit');

    useLayoutEffect(() => {
        dispatch(RESET_POST_DATA());
    }, [dispatch, isNew]);

    useEffect(() => {
        if (isNew) {
            setIsLoading(false);
            return;
        }

        dispatch(loadPostAsync(params.id)).then((postData) => {
            setError(postData.error);
            setIsLoading(false);
        });
    }, [params.id, dispatch, isNew]);

    if (isLoading) {
        return null;
    }

    const SpecificPost =
        isNew || isEdit ? (
            <PrivateContent access={[ROLE.ADMIN]}>
                <div className={className}>
                    <PostForm post={post} />
                </div>
            </PrivateContent>
        ) : (
            <div className={className}>
                <PostContent post={post} />
                <Comments comments={post.comments} postId={post.id} />
            </div>
        );

    return error ? <Error error={error} /> : SpecificPost;
};

export const Post = styled(PostContainer)`
    margin: 40px 0;
    padding: 0 80px;
    font-size: 18px;
`;
