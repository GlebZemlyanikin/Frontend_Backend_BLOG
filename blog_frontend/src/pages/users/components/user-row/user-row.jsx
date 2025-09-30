import styled from 'styled-components';
import { Icon } from '../../../../components/icon/icon';
import { TableRow } from '../table-row/table-row';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../../../constants/prop-type';
import { request } from '../../../../utils/request';

const UserRowContainer = ({
    className,
    login,
    id,
    registeredAt,
    roleId: userRoleId,
    roles,
    onUserRemove,
}) => {
    const [initialRoleId, setInitialRoleId] = useState(userRoleId);
    const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

    const onRoleChange = ({ target }) => {
        setSelectedRoleId(Number(target.value));
    };

    const onRoleSave = (userId, newUserRoleId) => {
        request(`/api/users/${userId}`, 'PATCH', {
            roleId: newUserRoleId,
        }).then(() => {
            setInitialRoleId(newUserRoleId);
        });
    };

    const isSaveButtonDisabled = selectedRoleId === initialRoleId;

    return (
        <div className={className}>
            <TableRow>
                <div className="login-column">{login}</div>
                <div className="registered-at-column">{registeredAt}</div>
                <div className="role-column">
                    <select value={selectedRoleId} onChange={onRoleChange}>
                        {roles.map(({ id: roleId, name: roleName }) => (
                            <option key={roleId} value={roleId}>
                                {roleName}
                            </option>
                        ))}
                    </select>
                    <Icon
                        id="fa-floppy-o"
                        margin="0 0 0 10px"
                        disabled={isSaveButtonDisabled}
                        onClick={() => onRoleSave(id, selectedRoleId)}
                    />
                </div>
            </TableRow>
            <Icon id="fa-trash-o" margin="0 0 0 10px" onClick={onUserRemove} />
        </div>
    );
};

export const UserRow = styled(UserRowContainer)`
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f3f4f6;
    align-items: baseline;

    & select {
        font-size: 16px;
        padding: 6px 8px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        background: #fff;
    }
`;

UserRow.propTypes = {
    login: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    registeredAt: PropTypes.string.isRequired,
    roleId: PROP_TYPE.ROLE_ID.isRequired,
    roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
    onUserRemove: PropTypes.func.isRequired,
};
