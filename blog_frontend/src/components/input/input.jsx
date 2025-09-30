import { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputContainer = forwardRef(({ className, ...props }, ref) => {
    return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer).withConfig({
    shouldForwardProp: (prop) => prop !== 'width',
})`
    width: ${({ width = '100%' }) => width};
    height: 40px;
    padding: 10px 12px;
    margin: 0 0 10px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 18px;
    background-color: #ffffff;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;

    &:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
    }
`;

Input.propTypes = {
    width: PropTypes.string,
};
