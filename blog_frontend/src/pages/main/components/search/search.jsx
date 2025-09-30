import styled from 'styled-components';
import { Input } from '../../../../components/input/input';
import { Icon } from '../../../../components/icon/icon';
import PropTypes from 'prop-types';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
    return (
        <div className={className}>
            <Input
                value={searchPhrase}
                type="text"
                placeholder="Поиск"
                onChange={onChange}
            />
            <Icon id="fa-search" size="22px" disabled={true} />
        </div>
    );
};

export const Search = styled(SearchContainer)`
    display: flex;
    position: relative;
    margin: 40px auto 0;
    width: 300px;
    height: 40px;

    & > input {
        padding-left: 10px;
        padding-right: 40px;
        font-size: 16px;
    }

    & > div {
        position: absolute;
        right: 10px;
        top: 6px;
    }
`;

Search.propTypes = {
    searchPhrase: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
