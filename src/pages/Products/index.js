import React from 'react';
import Header from '../../Components/Header/Header';
import Unitys from '../../Components/Unitys/Unitys';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import './style.css';
import { FaSearch } from 'react-icons/fa';

const validation = yup.object().shape({
    search: yup.string().required('Digite um produto'),
});

export default function Products() {
    function onHandleSearch(data) {
        console.log(data)
    }
    return(
        <>
            <Header/>
            <br></br>
            <div>
                <div className='search-container'>
                    <b>Produtos</b>
                    <div className='input-container'>
                        <Formik initialValues={{search:''}} 
                        onSubmit={( data ) => (onHandleSearch(data))} 
                        validationSchema={validation}
                        >
                            <Form>
                                <Field placeholder='Pesquise um produto' name='search' type='input'/>
                                <ErrorMessage component='p' name='search'/>
                                <button type='submit' name ='button'><FaSearch/></button>
                            </Form>
                        </Formik>
                    </div>
                    <button className='new-product'>Novo produto</button>
                </div>
                <br></br><br></br>
                <div className='list-products'>
                    <Unitys />
                    <Unitys />
                    <Unitys />
                </div>
                

            </div>
        </>
    );
}