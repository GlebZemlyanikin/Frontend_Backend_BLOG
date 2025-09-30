import styled from 'styled-components';
import { H2 } from '../../../../components/h2/h2';
import { PublishedAt } from '../published-at/published-at';
import { Icon } from '../../../../components/icon/icon';
import { useNavigate } from 'react-router-dom';
import { PROP_TYPE } from '../../../../constants/prop-type';

const PostContentContainer = ({
    className,
    post: { title, content, imageUrl, publishedAt, id },
}) => {
    const navigate = useNavigate();

    return (
        <div className={className}>
            {imageUrl ? <img src={imageUrl} alt={title} /> : null}
            <H2>{title}</H2>
            <PublishedAt
                id={id}
                publishedAt={publishedAt}
                margin="-20px 0 20px"
                editButton={
                    <Icon
                        id="fa-pencil-square-o"
                        margin="0 10px 0 0 "
                        size="22px"
                        onClick={() => {
                            navigate(`/post/${id}/edit`);
                        }}
                    />
                }
            />

            <div className="content">{content}</div>
        </div>
    );
};

export const PostContent = styled(PostContentContainer)`
    & img {
        float: left;
        width: 300px;
        height: 200px;
        margin: 0 20px 20px 0;
    }
    & .content {
        white-space: pre-wrap;
    }
`;

PostContent.propTypes = {
    post: PROP_TYPE.POST.isRequired,
};
