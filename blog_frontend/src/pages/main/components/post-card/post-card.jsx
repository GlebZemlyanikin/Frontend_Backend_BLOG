import styled from 'styled-components';
import { Icon } from '../../../../components/icon/icon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostCardContainer = ({
    className,
    id,
    title,
    imageUrl,
    publishedAt,
    commentsCount,
}) => {
    return (
        <div className={className}>
            <Link to={`/post/${id}`}>
                <img
                    src={imageUrl}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                />
                <div className="post-card-footer">
                    <h4>{title}</h4>
                    <div className="post-card-footer-info">
                        <div className="published-at">
                            <Icon
                                disabled={true}
                                id="fa-calendar-o"
                                size="18px"
                                margin="0 10px 0 0"
                            />
                            <p>{publishedAt}</p>
                        </div>
                        <div className="comments-count">
                            <Icon
                                disabled={true}
                                id="fa-comment-o"
                                size="18px"
                                margin="0 10px 0 0"
                            />
                            <p>{commentsCount}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export const PostCard = styled(PostCardContainer)`
    display: flex;
    flex-direction: column;
    width: 280px;
    margin: 20px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: transform 0.15s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }

    & a {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    & img {
        display: block;
        width: 100%;
        height: 240px;
        object-fit: cover;
    }

    & .post-card-footer {
        border-top: 1px solid #f3f4f6;
        background: #fafafa;
        min-height: 96px;
    }

    & h4 {
        padding: 12px 12px 4px;
        font-size: 18px;
        line-height: 1.3;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        min-height: 48px;
    }

    & .post-card-footer-info {
        display: flex;
        padding: 10px 12px 12px;
        justify-content: space-between;
        align-items: center;
    }

    & .published-at {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #6b7280;
    }

    & .comments-count {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #6b7280;
    }
`;

PostCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
};
