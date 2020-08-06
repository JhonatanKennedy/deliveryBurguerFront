import React, { useEffect, useState } from 'react';
import './style.css';
import Api from '../../services/api';
import ModalEditExtra from '../../Components/ModalEditExtra';
import ModalDeleteExtra from '../../Components/ModalDeleteExtra';


export default function ExtraItem(props){

    const [extras,setExtras] = useState([]);

    const category_id = props.category_id;
    const category_name = props.name;

    useEffect(() => {
        async function getExtras(){
            try {   
                const response = await Api.get(`/admin/extra/${category_id}`);
                setExtras(response.data);
            } catch (err) {
                alert(err.message);
            }
        }
        getExtras();
    },[category_id]);

    return(
        <>  
            {extras?.map((element) =>(
            <div className='extra-item-container' key={element.id}>
                <div className='extra-info-container'>
                    <b>Nome: <strong>{element.name}</strong></b>
                    <b>Preço: <strong>R${element.price}</strong></b>   
                </div>

                <div className='button-container'>
                    <ModalEditExtra category_name={category_name}
                    id={element.id} 
                    price={element.price} 
                    name={element.name}
                    /> 
                    <ModalDeleteExtra name={element.name} id={element.id}/>                  
                </div>
            </div>
            ))}

        </>
    );
}