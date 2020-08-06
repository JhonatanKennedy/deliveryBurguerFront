import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header/Header';
import CategoryItem from '../../Components/CategoryItem/index';
import Api from '../../services/api'
import ModalNewCategory from '../../Components/ModalNewCategory/index';
import './style.css';

export default function Categorys(){

    const [category,setCategory] = useState([]);


    useEffect(() => {
        async function getCategorys(){
            const token = localStorage.getItem('@DeliveryBurguer:token');
            Api.defaults.headers.authorization = `Bearer ${token}`;
            try {
                const response = await Api.get('/admin/category');
                setCategory(response.data);
            } catch (err) {
                alert(err.message);
            }
        }
        getCategorys();
    },[]);


    return(
        <>
            <Header/>
            <br></br>
            <div className='header-categorys'>
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;Categorias</h1>    
                <ModalNewCategory/>
            </div>
            <br></br>
            <div className='categorys-container'>  
                <div className='items'>
                {category?.map((element) => (
                    <CategoryItem name={element.name} id={element.id} key={element.id}/>
                ))}
                </div>
            </div>
        </>
    );
}