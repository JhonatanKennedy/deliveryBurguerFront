import React, { useContext, useEffect } from 'react';
import SignInAdm from '../SignInAdm/index';
import Login from '../Login/index';
import { AuthContext } from '../../context/AuthContext';


export default function Unauthorized() {

    const { admin, getAdmin } = useContext(AuthContext);
    
    useEffect(() => {
        getAdmin();
    },[getAdmin]);

    console.log(admin)
    return(
        <>
            {admin !== 0 && <Login/>}
            {admin === 0 && <SignInAdm/>}
        </>
    );
}