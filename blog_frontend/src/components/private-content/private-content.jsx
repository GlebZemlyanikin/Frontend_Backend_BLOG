import { Error } from '../error/error';
import { ERROR } from '../../constants/error';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors/select-user-role';
import { checkAccess } from '../../utils/check-access';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../constants/prop-type';

export const PrivateContent = ({ children, access, serverError = null }) => {
    const userRoel = useSelector(selectUserRole);

    const accessError = checkAccess(access, userRoel)
        ? null
        : ERROR.ACCESS_DENIED;

    const error = accessError || serverError;

    return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
    children: PropTypes.node.isRequired,
    access: PropTypes.arrayOf(PROP_TYPE.ROLE_ID).isRequired,
    serverError: PROP_TYPE.ERROR,
};
