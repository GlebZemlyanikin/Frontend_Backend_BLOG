import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconContainer = ({ className, id, ...props }) => (
    <div className={className} {...props}>
        <i className={`fa ${id}`} aria-hidden="true"></i>
    </div>
);

export const Icon = styled(IconContainer)`
    font-size: ${({ size = '24px' }) => size};
    margin: ${({ margin = '0' }) => margin};
    color: ${({ disabled }) => (disabled ? '#c7c7c7' : '#111827')};
    transition: color 0.15s ease, transform 0.05s ease, opacity 0.15s ease;

    &:hover {
        cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
        color: ${({ disabled }) => (disabled ? '#c7c7c7' : '#4f46e5')};
    }

    &:active {
        transform: ${({ disabled }) => (disabled ? 'none' : 'translateY(1px)')};
        opacity: ${({ disabled }) => (disabled ? 1 : 0.9)};
    }
`;

Icon.propTypes = {
    id: PropTypes.string.isRequired,
};
