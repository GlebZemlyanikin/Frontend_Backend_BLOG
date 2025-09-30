import styled from 'styled-components';
import { Icon } from '../../../../../components/icon/icon';
import { useDispatch } from 'react-redux';
import { removeCommentAsync } from '../../../../../action/remove-comment-async';
import { openModal } from '../../../../../action/open-modal';
import { CLOSE_MODAL } from '../../../../../action/close-modal';
import { checkAccess } from '../../../../../utils/check-access';
import { ROLE } from '../../../../../constants/role';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../../../selectors/select-user-role';
import PropTypes from 'prop-types';

const CommentContainer = ({
    className,
    id,
    content,
    author,
    publishedAt,
    postId,
}) => {
    const dispatch = useDispatch();
    const roleId = useSelector(selectUserRole);

    const onCommentDelete = (id) => {
        dispatch(
            openModal({
                text: 'Удалить комментарий?',
                onConfirm: () => {
                    dispatch(CLOSE_MODAL());
                    dispatch(removeCommentAsync(id, postId));
                },

                onCancel: () => dispatch(CLOSE_MODAL()),
            })
        );
    };

    const isAdminOrModerator = checkAccess(
        [ROLE.ADMIN, ROLE.MODERATOR],
        roleId
    );

    return (
        <div className={className}>
            <div className="comment">
                <div className="comment-header">
                    <div className="author">
                        <Icon
                            disabled={true}
                            id="fa-user-circle-o"
                            margin="0 10px 0 0"
                            size="18px"
                        />
                        {author}
                    </div>
                    <div className="published-at">
                        <Icon
                            disabled={true}
                            id="fa-calendar-o"
                            margin="0 10px 0 0"
                            size="18px"
                        />
                        {publishedAt}
                    </div>
                </div>
                <div className="comment">{content}</div>
            </div>
            {isAdminOrModerator && (
                <Icon
                    id="fa-trash-o"
                    margin="0 0 0 10px"
                    size="18px"
                    onClick={() => onCommentDelete(id)}
                />
            )}
        </div>
    );
};

export const Comment = styled(CommentContainer)`
    display: flex;
    padding: 14px 0;
    border-bottom: 1px solid #f3f4f6;

    & .comment {
        width: 100%;
        padding: 0 12px;
    }

    & .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    & .author {
        display: flex;
        align-items: center;
        color: #111827;
        font-weight: 600;
    }

    & .published-at {
        display: flex;
        align-items: center;
        color: #6b7280;
        font-size: 14px;
    }

    & .comment {
        margin: 10px 0 0;
        font-size: 16px;
        line-height: 1.5;
    }
`;

Comment.propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
};
