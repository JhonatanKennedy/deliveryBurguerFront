import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Unitys from '../../Components/Unitys/Unitys';

import './style.css';
import { FaSearch } from 'react-icons/fa';
import Api from '../../services/api';
import ModalNew from '../../Components/ModalNew/index';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


export default function Products() {

    const [category,setCategory] = useState([]);
    const [products,setProducts] = useState([]);
    const [search,setSearch] = useState('');

    useEffect(() => {
        async function getCategorys(){
            const token = localStorage.getItem('@DeliveryBurguer:token');
            Api.defaults.headers.authorization = `Bearer ${token}`;
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
            const token = localStorage.getItem('@DeliveryBurguer:token');
            Api.defaults.headers.authorization = `Bearer ${token}`;

            try {
                const products = await Api.get('/admin/product');
                setProducts(products.data);
            } catch (err) {
                alert(err.message);
            }
        }
        getProducts();
    },[]); 


    return(
        <>
            <Header/>
            <br></br>
            <br></br>
            <div>
                <div className='search-container'>
                    <b>Produtos</b>
                    <div className='input-container'> 
                        <input type='text' placeholder='Digite o nome de um produto' onChange={(e)=>(setSearch(e.target.value))} />
                        <button name ='button' ><FaSearch/></button><br></br>
                    </div>
                    {category?.length === 0 && 
                        <OverlayTrigger placement='bottom' overlay={<Tooltip>É preciso cadastrar uma categoria!</Tooltip>}>
                            <button className='new-product'>Novo produto</button>   
                        </OverlayTrigger>
                    }
                    
                    {category?.length >= 1 && <ModalNew categorys={category}/>}
                </div>
                <br></br><br></br>
                <div className='list-products'>
                    {search === '' && products?.map((element) => (
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
                    {search !== '' && products?.map((element) => {
                        if(!element.name.indexOf(search)){
                            return(       
                            <Unitys url={element.photo} 
                                name={element.name} 
                                price={element.price}
                                description={element.description}
                                category={element.category_id}
                                key={element.id}
                                categorys={category}
                                id={element.id}
                            />)
                        }
                    })}                 
                </div>
            </div>
        </>
    );
}

