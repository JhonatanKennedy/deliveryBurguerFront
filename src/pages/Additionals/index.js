import React from 'react';
import Header from '../../Components/Header/Header';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { FaSearch } from 'react-icons/fa';
import * as yup from 'yup';

const validation = yup.object().shape({
    search: yup.string().required('Digite um produto'),
});

export default function Additionals () {
    function onHandleSearch(data){

    }

    return(
        <>
        <Header/>
        <br></br>
            <div className='search-container'>
                <b>Adicionais</b>
                    <div className='input-container'>
                        <Formik initialValues={{search:''}} 
                        onSubmit={( data ) => (onHandleSearch(data))} 
                        validationSchema={validation}
                        >
                            <Form>
                                <Field placeholder='Pesquise um adicional' name='search' type='input'/>
                                <ErrorMessage component='p' name='search'/>
                                <button type='submit' name ='button'><FaSearch/></button>
                            </Form>
                        </Formik>
                    </div>
                    <button className='new-product'>Novo adicional</button>
                </div>
                <br></br><br></br>
                <div className='list-extras'>
                    
                </div>
        </>
    );

}