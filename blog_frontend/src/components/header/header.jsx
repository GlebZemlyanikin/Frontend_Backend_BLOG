import { Logo } from './components/logo';
import { ControlPanel } from './components/control-panel';
import styled from 'styled-components';

const Discription = styled.div`
    font-size: 18px;
    font-family: 'Playfair Display', Georgia, 'Times New Roman', Times, serif;
    font-weight: 600;
`;

const HeaderContainer = ({ className }) => (
    <header className={className}>
        <Logo />
        <Discription>
            Веб-технологии
            <br />
            Написание кода
            <br />
            Разбор ошибок
        </Discription>
        <ControlPanel />
    </header>
);

export const Header = styled(HeaderContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    height: 120px;
    padding: 20px 40px;
    background-color: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    border-bottom: 1px solid #f3f4f6;
`;
