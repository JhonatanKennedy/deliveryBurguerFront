import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import './style.css';

const validations = yup.object().shape({
    user: yup.string().required('Digite um usuário'),
    password: yup.string().required('Digite uma senha')
});

export default function Login() {

    function onHandleLogin(data){

        console.log(data)
    }

    return(
        <div className='login-container'>
            <div className='login-box'>
                <Formik initialValues={{user:''},{password:''}}
                onSubmit={( data ) => (onHandleLogin(data))}
                validationSchema={validations}
                >
                    <Form>
                    <b>Login</b>
                        <div className='input-container'>
                            <div>
                                <Field placeholder='Usuário' name='user' type='input'/>
                                <ErrorMessage component='p' name='user'/>
                            </div>
                            <div>
                                <Field placeholder='Senha' name='password' type='password'/>
                                <ErrorMessage component='p' name='password'/>                                 
                            </div>
                  
                        </div>

                        <button type='submit' name ='button'>Entrar</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}