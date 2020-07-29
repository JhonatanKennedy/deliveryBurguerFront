import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Unitys from '../../Components/Unitys/Unitys';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import './style.css';
import { FaSearch } from 'react-icons/fa';
import Api from '../../services/api';
import ModalNew from '../../Components/ModalNew/index';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const validation = yup.object().shape({
    search: yup.string().required('Digite um produto'),
});

export default function Products() {

    const [category,setCategory] = useState([]);
    const [products,setProducts] = useState([]);

    useEffect(() => {
        async function getCategorys(){
            try {
                const categorys = await Api.get('/admin/category');
                setCategory(categorys.data);
            } catch (err) {
                alert(err.message);
            }
        }
        getCategorys();
    },[]);
    

    useEffect(() => {
        async function getProducts(){
            try {
                const products = await Api.get('/admin/product');
                setProducts(products.data);
            } catch (err) {
                alert(err.message);
            }
        }
        getProducts();
    },[]);
    async function onHandleSearch(data) {
    }

    return(
        <>
            <Header/>
            <br></br>
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
                                <button type='submit' name ='button'><FaSearch/></button><br></br>
                                <ErrorMessage component='span' name='search'/>
                            </Form>
                        </Formik>
                    </div>
                    {category && category.length === 0 && 
                        <OverlayTrigger placement='bottom' overlay={<Tooltip>É preciso cadastrar uma categoria!</Tooltip>}>
                            <button className='new-product'>Novo produto</button>   
                        </OverlayTrigger>
                    }
                    
                    {category && category.length >= 1 && <ModalNew categorys={category}/>}
                </div>
                <br></br><br></br>
                <div className='list-products'>
                    {products && products.map((element) => (
                        <Unitys url={element.photo} 
                        name={element.name} 
                        price={element.price}
                        description={element.description}
                        category={element.category_id}
                        key={element.id}
                        categorys={category}
                        id={element.id}
                        />
                    ))}
                </div>
                

            </div>
        </>
    );
}

//falta add a edição de footos no unitys/modaledit