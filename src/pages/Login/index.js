import React, { useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import './style.css';

const validations = yup.object().shape({
    login: yup.string().required('Digite um usuário'),
    password: yup.string().required('Digite uma senha')
});

export default function Login() {

    const { signIn } = useContext(AuthContext);

    const onHandleLogin = useCallback((data) => {
        signIn(data);
    },[signIn]);
    

    return(
        <div className='login-container'>
            <div className='login-box'>
                <Formik initialValues={{login:'',password:''}}
                onSubmit={( data ) => (onHandleLogin(data))}
                validationSchema={validations}
                >
                    <Form>
                    <b>Login</b>
                        <div className='input-container'>
                            <div>
                                <Field placeholder='Login' name='login' type='input'/>
                                <br></br>
                                <ErrorMessage component='em' name='login'/>
                                <br></br>
                            </div>
                            <div>
                                <Field placeholder='Senha' name='password' type='password'/>
                                <br></br>
                                <ErrorMessage component='em' name='password'/>                                 
                            </div>
                            <br></br>
                            <b>esqueceu a senha?</b>
                        </div>

                        <button type='submit' name ='button'>Entrar</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}