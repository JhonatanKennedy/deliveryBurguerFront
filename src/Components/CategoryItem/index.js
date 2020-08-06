import React from 'react';
import './style.css';
import ModalEditCategory from '../ModalEditCategory/index';
import ModalDeleteCategory from '../ModalDeleteCategory/index';


export default function CategoryItem(props){
    const nome = props.name;
    const id = props.id;

    return(
        <>  
            <div className='category-item-container'>
                <b>Nome: <strong>{nome}</strong></b>
                <div className='button-container'>
                    <ModalEditCategory id={id}/>
                    <ModalDeleteCategory id={id} name={nome}/>                         
                </div>
            </div>

        </>
    );
}