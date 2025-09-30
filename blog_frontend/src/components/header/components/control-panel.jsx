import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../icon/icon';
import { Button } from '../../button/button';
import styled from 'styled-components';
import { ROLE } from '../../../constants/role';
import { selectUserRole } from '../../../selectors/select-user-role';
import { selectUserLogin } from '../../../selectors/select-user-login';
import { logout } from '../../../action/logout';
import { checkAccess } from '../../../utils/check-access';

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
`;

const UserName = styled.div`
    font-weight: 600;
    font-size: 20px;
`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const roleId = useSelector(selectUserRole);
    const login = useSelector(selectUserLogin);

    const onLogout = () => {
        dispatch(logout());
        sessionStorage.removeItem('userData');
    };

    const isAdmin = checkAccess([ROLE.ADMIN], roleId);

    return (
        <div className={className}>
            <RightAligned>
                {roleId === ROLE.GUEST ? (
                    <Button>
                        <Link to="/login">Войти</Link>
                    </Button>
                ) : (
                    <>
                        <UserName>{login}</UserName>
                        <Icon id="fa-sign-out" onClick={onLogout} />
                    </>
                )}
            </RightAligned>
            <RightAligned>
                <Icon id="fa-backward" onClick={() => navigate(-1)} />
                {isAdmin && (
                    <>
                        <Link to="/post">
                            <Icon id="fa-file-text-o" />
                        </Link>

                        <Link to="/users">
                            <Icon id="fa-users" />
                        </Link>
                    </>
                )}
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)``;
