import styled from 'styled-components';
import { Button } from '../../../../components/button/button';
import PropTypes from 'prop-types';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
    return (
        <div className={className}>
            <Button disabled={page === 1} onClick={() => setPage(1)}>
                В начало
            </Button>
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Назад
            </Button>
            <div className="current-page">Текущая страница: {page}</div>
            <Button
                disabled={page === lastPage}
                onClick={() => setPage(page + 1)}
            >
                Вперед
            </Button>
            <Button
                disabled={page === lastPage}
                onClick={() => setPage(lastPage)}
            >
                В конец
            </Button>
        </div>
    );
};

export const Pagination = styled(PaginationContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;

    & button {
        margin: 0 10px;
        width: 100px;
    }

    & .current-page {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        width: 220px;
        height: 32px;
        text-align: center;
        padding: 6px 10px;
        font-size: 18px;
        background: #fafafa;
    }
`;

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
};
