import styled from 'styled-components';
import PropTypes from 'prop-types';

const TableRowContainer = ({ className, children }) => (
    <div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
    display: flex;
    align-items: center;
    padding: 10px 0;

    & > div {
        display: flex;
        padding: 0 12px;
        font-size: 16px;
    }

    & .login-column {
        width: 172px;
    }

    & .registered-at-column {
        width: 213px;
    }

    & .role-column {
        width: auto;
    }
`;

TableRow.propTypes = {
    children: PropTypes.node.isRequired,
};
