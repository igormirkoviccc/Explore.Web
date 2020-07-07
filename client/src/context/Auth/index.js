import React, { useState } from 'react';
import Context, { ContextDefinition } from './AuthContext';

const isAuthLS = !!window.localStorage.getItem('auth_token');

const State = (props) => {
    const [isAuth, setAuth] = useState(isAuthLS);

    const setToken = (token, id = null, role = null) => {
        if (token) {
            window.localStorage.setItem('auth_token', token);
            window.localStorage.setItem('user_id', id);
            window.localStorage.setItem('role', role);
        } else {
            window.localStorage.removeItem('auth_token');
            window.localStorage.removeItem('user_id');
            window.localStorage.removeItem('role');
        }
        setAuth(!!token);
    };

    return (
        <ContextDefinition.Provider
            value={{
                isAuth,
                setAuth: setToken,
            }}
        >
            {props.children}
        </ContextDefinition.Provider>
    );
};

export {
    State,
    Context,
};
