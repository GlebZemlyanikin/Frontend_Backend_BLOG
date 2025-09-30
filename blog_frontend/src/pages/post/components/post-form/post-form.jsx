import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Input } from '../../../../components/input/input';
import { PublishedAt } from '../published-at/published-at';
import { Icon } from '../../../../components/icon/icon';
import { useLayoutEffect, useRef, useState } from 'react';
import { savePostAsync } from '../../../../action/save-post-async';
import { useNavigate } from 'react-router-dom';
import { PROP_TYPE } from '../../../../constants/prop-type';

const PostFormContainer = ({
    className,
    post: { title, content, imageUrl, publishedAt, id },
}) => {
    const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
    const [titleValue, setTitleValue] = useState(title);

    const contentRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        setImageUrlValue(imageUrl);
        setTitleValue(title);
    }, [imageUrl, title]);

    const onSave = () => {
        const content = contentRef.current.innerText;

        dispatch(
            savePostAsync(id, {
                imageUrl: imageUrlValue,
                title: titleValue,
                content: content,
            })
        ).then(({ id }) => {
            navigate(`/post/${id}`);
        });
    };

    const onImageChange = ({ target }) => {
        setImageUrlValue(target.value);
    };
    const onTitleChange = ({ target }) => {
        setTitleValue(target.value);
    };

    return (
        <div className={className}>
            <Input
                value={imageUrlValue}
                placeholder="Изображение"
                onChange={onImageChange}
            />
            <Input
                value={titleValue}
                placeholder="Заголовок"
                onChange={onTitleChange}
            />
            <PublishedAt
                id={id}
                publishedAt={publishedAt}
                margin="20px 0"
                editButton={
                    <Icon
                        id="fa-floppy-o"
                        size="22px"
                        margin="0 10px 0 0"
                        onClick={onSave}
                    />
                }
            />

            <div
                ref={contentRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="content"
            >
                {content}
            </div>
        </div>
    );
};

export const PostForm = styled(PostFormContainer)`
    & img {
        float: left;
        width: 300px;
        height: 200px;
        margin: 0 20px 20px 0;
    }
    & .content {
        white-space: pre-wrap;
        min-height: 100px;
        border: 1px solid #000;
    }
`;

PostForm.propTypes = {
    post: PROP_TYPE.POST.isRequired,
};
