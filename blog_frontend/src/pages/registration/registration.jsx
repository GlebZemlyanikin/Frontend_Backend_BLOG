import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { Input } from '../../components/input/input.jsx';
import { Button } from '../../components/button/button.jsx';
import { H2 } from '../../components/h2/h2.jsx';
import { AuthFormError } from '../../components/auth-form-error/auth-form-error.js';
import { setUser } from '../../action/set-user.js';
import { selectUserRole } from '../../selectors/select-user-role.js';
import { ROLE } from '../../constants/role.js';
import { useResetForm } from '../../hooks/use-reset-form.js';
import { request } from '../../utils/request.js';

const regFormSchema = yup.object().shape({
    login: yup
        .string()
        .required('Заполнить логин')
        .matches(
            /^\w+$/,
            'Неверно заполнен логин. Допускается только буквы и цифры'
        )
        .min(3, 'Неверно заполнен логин. Минимум 3 символа')
        .max(15, 'Неверно заполнен логин. Максимум 15 символа'),
    password: yup
        .string()
        .required('Заполнить пароль')
        .matches(
            /^[\w#%]+$/,
            'Неверно заполнен пароль. Допускается только буквы, цифры и знаки # %'
        )
        .min(6, 'Неверно заполнен пароль. Минимум 6 символа')
        .max(20, 'Неверно заполнен пароль. Максимум 20 символа'),
    passcheck: yup
        .string()
        .required('Заполнить пароль')
        .oneOf([yup.ref('password'), null], 'Пароль не совпадает'),
});

const RegistrationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: '',
            password: '',
            passcheck: '',
        },
        resolver: yupResolver(regFormSchema),
    });

    const [serverError, setServerError] = useState(null);

    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);

    useResetForm(reset);

    const onSubmit = ({ login, password }) => {
        request('/api/register', 'POST', {
            login,
            password,
        }).then(({ error, user }) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }

            dispatch(setUser(user));
            sessionStorage.setItem('userData', JSON.stringify(user));
        });
    };

    const formError =
        errors?.login?.message ||
        errors?.password?.message ||
        errors?.passcheck?.message;

    const errorMessage = formError || serverError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />;
    }

    return (
        <div className={className}>
            <H2>Регистрация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Логин..."
                    {...register('login', {
                        onChange: () => setServerError(null),
                    })}
                />
                <Input
                    type="password"
                    placeholder="Пароль..."
                    {...register('password', {
                        onChange: () => setServerError(null),
                    })}
                />
                <Input
                    type="password"
                    placeholder="Подтвердите пароль..."
                    {...register('passcheck', {
                        onChange: () => setServerError(null),
                    })}
                />
                <Button type="submit" disabled={!!formError}>
                    Регистрация
                </Button>
                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
            </form>
        </div>
    );
};

export const Registration = styled(RegistrationContainer)`
    display: flex;
    align-items: center;
    flex-direction: column;

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
    }
`;
