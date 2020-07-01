import { createContext, useContext } from 'react';

export const ContextDefinition = createContext({
    isAuth: false,
    setAuth: () => {}
});


export default () => useContext(ContextDefinition);
