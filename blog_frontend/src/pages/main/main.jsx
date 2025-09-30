import styled from 'styled-components';
import { useEffect, useState, useMemo } from 'react';
import { request } from '../../utils/request';
import { PostCard } from './components/post-card/post-card';
import { Pagination } from './components/pagination/pagination';
import { PAGINATION_LIMIT } from '../../constants/pagination-limit';
import { Search } from './components/search/search';
import { debounce } from '../../utils/debouce';

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [search, setSearch] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        request(
            `/api/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
            'GET'
        ).then(({ data: { posts, lastPage } }) => {
            setPosts(posts);
            setLastPage(lastPage);
            setIsLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search]);

    const debouncedSearch = useMemo(() => debounce(setSearch, 300), []);

    const onSearch = ({ target }) => {
        setSearchPhrase(target.value);
        debouncedSearch(!search);
    };

    return (
        <div className={className}>
            {!isLoading && (
                <Search searchPhrase={searchPhrase} onChange={onSearch} />
            )}
            {isLoading ? null : posts.length ? (
                <div className="post-list">
                    {posts.map(
                        ({ id, title, imageUrl, publishedAt, comments }) => (
                            <PostCard
                                key={id}
                                id={id}
                                title={title}
                                imageUrl={imageUrl}
                                publishedAt={publishedAt}
                                commentsCount={comments.length}
                            />
                        )
                    )}
                </div>
            ) : searchPhrase.trim() ? (
                <div className="no-results">Поиск не дал результатов</div>
            ) : null}
            {lastPage > 1 && (
                <Pagination page={page} lastPage={lastPage} setPage={setPage} />
            )}
        </div>
    );
};

export const Main = styled(MainContainer)`
    & .search {
        margin: 20px;
    }

    & .post-list {
        display: flex;
        flex-wrap: wrap;
        font-size: 18px;
        padding: 20px;
    }

    & .no-results {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        padding: 40px;
    }
`;
