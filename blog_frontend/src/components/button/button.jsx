import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonContainer = ({ children, className, ...props }) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export const Button = styled(ButtonContainer).withConfig({
    shouldForwardProp: (prop) => prop !== 'width',
})`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    width: ${({ width = '100%' }) => width};
    height: 32px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background-color: #f3f4f6;
    padding: 10px;
    color: #111827;
    transition: background-color 0.2s ease, box-shadow 0.2s ease,
        transform 0.05s ease;

    &:hover {
        cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
        background-color: ${({ disabled }) =>
            disabled ? '#f3f4f6' : '#e5e7eb'};
        box-shadow: ${({ disabled }) =>
            disabled ? 'none' : '0 2px 6px rgba(0,0,0,0.08)'};
    }

    &:active {
        transform: translateY(1px);
    }

    &:disabled {
        opacity: 0.6;
    }
`;

Button.propTypes = {
    children: PropTypes.node.isRequired,
    width: PropTypes.string,
};
