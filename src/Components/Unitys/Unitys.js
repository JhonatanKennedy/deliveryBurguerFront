import React from 'react';
import './style.css';
import ModalEdit from '../../Components/ModalEdit/index';
import ModalDelete from '../../Components/ModalDelete/index';

export default function Unitys(props) {
    const id = props.id;
    const url = props.url;
    const name = props.name;
    const price = props.price;
    const description = props.description;
    const category = props.category;
    const categorys = props.categorys;
    
    for (let obj in categorys) {
        if(categorys[obj].id === category){
            var categoryName = categorys[obj].name;
        }
    }

    return(
        <>
            <div className='produto-container'>
                <div className='img-container'>
                    <img src={'http://localhost:3333/files/' + url} alt='Product'/>
                </div>
                <div className='info-container'>
                    <b>Nome: <span> {name}</span></b>
                    <b>Preço: <span>R$ {price}</span></b>
                    <b>Descrição: <span> {description}</span> </b> 
                    <b>Categoria: <span> {categoryName}</span></b>
                </div>
                <div className='buttons-container'>
                    <ModalEdit name={name}
                    price={price}
                    description={description}
                    category={categoryName}
                    id={id}
                    /> 
                    <ModalDelete id={id}/>                   
                </div>

            </div>
        </>
    );

}