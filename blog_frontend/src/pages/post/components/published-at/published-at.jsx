import styled from 'styled-components';
import { Icon } from '../../../../components/icon/icon';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../action/open-modal';
import { CLOSE_MODAL } from '../../../../action/close-modal';
import { removePostAsync } from '../../../../action/remove-post-async';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils/check-access';
import { ROLE } from '../../../../constants/role';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors/select-user-role';
import PropTypes from 'prop-types';

const PublishedAtContainer = ({ className, publishedAt, editButton, id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roleId = useSelector(selectUserRole);

    const onPostDelete = (id) => {
        dispatch(
            openModal({
                text: 'Удалить пост?',
                onConfirm: () => {
                    dispatch(CLOSE_MODAL());
                    dispatch(removePostAsync(id)).then(() => {
                        navigate(`/`);
                    });
                },

                onCancel: () => dispatch(CLOSE_MODAL()),
            })
        );
    };

    const isAdmin = checkAccess([ROLE.ADMIN], roleId);

    return (
        <div className={className}>
            <div className="published-at-date">
                {publishedAt && (
                    <Icon
                        disabled={true}
                        margin="0 10px 0 0"
                        id="fa-calendar-o"
                        size="18px"
                    />
                )}
                {publishedAt}
            </div>
            {isAdmin && (
                <div className="published-at-actions">
                    {editButton}
                    {publishedAt && (
                        <Icon
                            id="fa-trash-o"
                            size="22px"
                            margin="0 0 2px 0"
                            onClick={() => onPostDelete(id)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export const PublishedAt = styled(PublishedAtContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: ${({ margin }) => margin};

    & .published-at {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
        font-size: 18px;
    }

    & .published-at-date {
        display: flex;
        align-items: center;
    }

    & .published-at-actions {
        display: flex;
        align-items: center;
    }
`;

PublishedAt.propTypes = {
    publishedAt: PropTypes.string.isRequired,
    editButton: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
};
