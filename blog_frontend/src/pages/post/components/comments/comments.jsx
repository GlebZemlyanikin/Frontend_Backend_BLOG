import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../../components/icon/icon';
import { Comment } from './comment/comment';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAsync } from '../../../../action/add-comment-async';
import { ROLE } from '../../../../constants/role';
import { selectUserRole } from '../../../../selectors/select-user-role';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../../../constants/prop-type';

const CommentsContainer = ({ className, comments, postId }) => {
    const [newComment, setNewComment] = useState('');
    const dispatch = useDispatch();
    const roleId = useSelector(selectUserRole);

    const onNewCommentSubmit = (userId, content) => {
        dispatch(addCommentAsync(userId, content));
        setNewComment('');
    };

    const isGuest = roleId === ROLE.GUEST;
    return (
        <div className={className}>
            {!isGuest && (
                <div className="new-comment">
                    <textarea
                        name="newComment"
                        value={newComment}
                        placeholder="Напишите комментарий"
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Icon
                        id="fa-paper-plane-o"
                        margin="0 0 0 10px"
                        size="18px"
                        onClick={() => onNewCommentSubmit(postId, newComment)}
                    />
                </div>
            )}
            <div className="comments">
                {comments.map(({ id, content, author, publishedAt }) => (
                    <Comment
                        key={id}
                        postId={postId}
                        id={id}
                        content={content}
                        author={author}
                        publishedAt={publishedAt}
                    />
                ))}
            </div>
        </div>
    );
};

export const Comments = styled(CommentsContainer)`
    margin: 0 auto;
    width: 580px;

    & .new-comment {
        display: flex;
        width: 100%;
        margin: 20px 0 0;
    }

    & .new-comment textarea {
        width: 100%;
        resize: none;
        height: 120px;
        font-size: 18px;
        padding: 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        transition: box-shadow 0.2s ease, border-color 0.2s ease;

        &:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
        }
    }
`;

Comments.propTypes = {
    comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
    postId: PropTypes.number.isRequired,
};
