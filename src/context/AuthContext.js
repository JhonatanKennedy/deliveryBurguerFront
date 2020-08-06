import React,{ createContext, useCallback, useState} from 'react';
import Api from '../services/api';

export const AuthContext = createContext({ });

export const AuthProvider = ({ children }) => {
    
    const [admin,setAdmin] = useState([]);

    const getAdmin = useCallback(async () => {
        const response = await Api.get('/admin/register');
        setAdmin(response.data.length);
    },[]);

    const signIn = useCallback(async ({login, password}) => {
        const response = await Api.post('/sessions/admin',{
            login,
            password
        })
        const { token } = response.data;
        localStorage.setItem('@DeliveryBurguer:token', token);
        window.location.reload();
    },[]);

    const signOut = useCallback( () => {
        localStorage.removeItem('@DeliveryBurguer:token');
        window.location.reload();
    },[]);

    return(
        <AuthContext.Provider value={{signIn, admin: admin, getAdmin, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}