import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Api from '../../services/api';
import ModalNewExtra from '../../Components/ModalNewExtra/index';
import ExtraItem from '../../Components/ExtraItem/index';
import './style.css';

export default function Additionals () {

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
        <div className='header-extras'>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;Adicionais</h1>    
            <ModalNewExtra categorys={category}/>
        </div>
        <br></br>
        <div className='extras-container'>
            {category?.map((element) => (
                <div key={element.id}>
                    <br></br>
                    <h4>&nbsp;&nbsp;{element.name}</h4>
                    <div className='extra-items'>
                        <ExtraItem category_id={element.id} name={element.name}/>    
                    </div>
                    
                </div>
            ))}
            
        </div>


        </>
    );

}