import { Link } from 'react-router-dom';
import { Icon } from '../../icon/icon';
import styled from 'styled-components';

const LargeText = styled.div`
    font-size: 64px;
    font-weight: bold;
    line-height: 48px;
    margin-top: 17px;
`;

const SmallText = styled.div`
    font-size: 25px;
    font-weight: bold;
`;

const LogoComponent = ({ className }) => (
    <Link className={className} to="/">
        <Icon id="fa-code" size="70px" margin="0 10px 0 0" />
        <div>
            <LargeText>Блог</LargeText>
            <SmallText>веб-разработчик</SmallText>
        </div>
    </Link>
);

export const Logo = styled(LogoComponent)`
    display: flex;
    margin-top: -21px;
`;
