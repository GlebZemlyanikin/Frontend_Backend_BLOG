import styled from 'styled-components';
import { H2 } from '../../components/h2/h2';
import { UserRow } from './components/user-row/user-row';
import { TableRow } from './components/table-row/table-row';
import { useEffect, useState } from 'react';
import { PrivateContent } from '../../components/private-content/private-content';
import { ROLE } from '../../constants/role';
import { checkAccess } from '../../utils/check-access';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors/select-user-role';
import { request } from '../../utils/request';

const UsersContainer = ({ className }) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(null);
    const userRole = useSelector(selectUserRole);

    useEffect(() => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return;
        }

        Promise.all([
            request('/api/users', 'GET'),
            request('/api/users/roles', 'GET'),
        ]).then(([usersRes, rolesRes]) => {
            if (usersRes.error || rolesRes.error) {
                setErrorMessage(usersRes.error || rolesRes.error);
                return;
            }

            setUsers(usersRes.data);
            setRoles(rolesRes.data);
        });
    }, [shouldUpdateUserList, userRole]);

    const onUserRemove = (userId) => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return;
        }
        request(`/api/users/${userId}`, 'DELETE').then(() => {
            setShouldUpdateUserList(!shouldUpdateUserList);
        });
    };

    return (
        <div className={className}>
            <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
                <H2>Пользователи</H2>
                <div>
                    <TableRow>
                        <div className="login-column">Логин</div>
                        <div className="registered-at-column">
                            Дата регистрации
                        </div>
                        <div className="role-column">Роль</div>
                    </TableRow>

                    {users.map(({ id, login, registeredAt, roleId }) => {
                        return (
                            <UserRow
                                key={id}
                                id={id}
                                login={login}
                                registeredAt={registeredAt}
                                roleId={roleId}
                                roles={roles.filter(
                                    ({ id: roleId }) => roleId !== ROLE.GUEST
                                )}
                                onUserRemove={() => onUserRemove(id)}
                            />
                        );
                    })}
                </div>
            </PrivateContent>
        </div>
    );
};

export const Users = styled(UsersContainer)`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 570px;
    margin: 0 auto;
    font-size: 18px;

    & > div > div:first-child {
        background: #fafafa;
        border: 1px solid #f3f4f6;
        border-radius: 10px;
        padding: 12px 4px;
        margin-bottom: 8px;
    }

    & > div > div:first-child .login-column,
    & > div > div:first-child .registered-at-column,
    & > div > div:first-child .role-column {
        font-weight: 600;
        color: #374151;
    }
`;
