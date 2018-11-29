import React from 'react';

export const Login = (props) => {
    const { sendAuthRequest } = props;
    let login = '';
    let pass = '';
    return (
        <div>
            <input type='text'
                   defaultValue={login}
                   placeholder='Введите логин'
                   ref={input => login = input}>
            </input>
            <input type='pass'
                   defaultValue={login}
                   placeholder='Введите пароль'
                   ref={input => pass = input}>
            </input>
            <button onClick={ev => sendAuthRequest(login, pass)}>Вход</button>
        </div>
    );
};

export default Login;
