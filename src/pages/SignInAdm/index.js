import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Api from '../../services/api';
import './style.css';

const validations = yup.object().shape({
    email: yup.string().email('Digite um email valido!').required('É necessario digitar um email!'),
    login: yup.string().matches(
        /^.[a-zA-Z0-9_]+$/,
        {
          message: 'Apenas letras e números!',
          excludeEmptyString: true,
        },
      ).required('Digite um usuário'),
    password: yup.string().required('Digite uma senha'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'),null], 'Senhas devem ser iguais!')
});


export default function SignInAdmin(){

    async function onHandleLogin(data){
        delete data.passwordConfirmation;
        try{
            await Api.post('/admin/register',data);
            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    }

    return(
        <div className='cad-container'> 
            <div className='cad-box'>
                <Formik initialValues={{email:'',login:'',password:'',passwordConfirmation:''}}
                onSubmit={( data ) => (onHandleLogin(data))}
                validationSchema={validations}
                >
                    <Form>
                    <b>Cadastro</b>
                        <div className='input-container'>
                            <div>
                                <Field placeholder='Digite um email' name='email' type='email'/>
                                <br></br>
                                <ErrorMessage component='em' name='email'/>
                                <br></br>
                            </div>
                            <div>
                                <Field placeholder='Digite o usuário' name='login' type='input'/>
                                <br></br>
                                <ErrorMessage component='em' name='login'/>
                                <br></br>
                            </div>
                            <div>
                                <Field placeholder='Digite a senha' name='password' type='password'/>
                                <br></br>
                                <ErrorMessage component='em' name='password'/>               
                                <br></br>                  
                            </div>
                            <div>
                                <Field placeholder='Confirme a Senha' name='passwordConfirmation' type='password'/>
                                <br></br>
                                <ErrorMessage component='em' name='passwordConfirmation'/>         
                                <br></br>                        
                            </div>
                  
                        </div>

                        <button type='submit' name ='button'>Entrar</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}