import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import styled from 'styled-components';
import { Authorization } from './pages/authorization/authorization';
import { Registration } from './pages/registration/registration';
import { Users } from './pages/users/users';
import { Post } from './pages/post/post';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './action/set-user';
import { Modal } from './components/modal/modal';
import { Main } from './pages/main/main';
import { Error } from './components/error/error';
import { ERROR } from './constants/error';

const AppColum = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1000px;
    min-height: 100%;
    background-color: #fff;
    margin: 0 auto;
`;

const Page = styled.div`
    // padding: 120px 0 20px;
`;

function App() {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const currentUserDataJSON = sessionStorage.getItem('userData');
        if (!currentUserDataJSON) return;

        const currentUserData = JSON.parse(currentUserDataJSON);

        dispatch(
            setUser({
                ...currentUserData,
                roleId: Number(currentUserData.roleId),
            })
        );
    }, [dispatch]);

    return (
        <AppColum>
            <Header />
            <Page>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Authorization />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/post/:id" element={<Post />} />
                    <Route path="/post/:id/edit" element={<Post />} />
                    <Route
                        path="*"
                        element={<Error error={ERROR.PAGE_NOT_FOUND} />}
                    />
                </Routes>
            </Page>
            <Footer />
            <Modal />
        </AppColum>
    );
}

export default App;
