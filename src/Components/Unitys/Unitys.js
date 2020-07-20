import React from 'react';
import './style.css';
import { GrEdit } from 'react-icons/gr'
import { TiDelete } from 'react-icons/ti'

export default function Unitys() {

    return(
        <>
            <div className='produto-container'>
                <div className='img-container'>
                    <img src='https://portal.minervafoods.com/files/styles/blog_post_page/public/como_fazer_hamburguer_caseiro.jpg?itok=s50ral-Y'/>
                </div>
                <div className='info-container'>
                    <b>Nome: <span>{}x-eggburguer</span></b>
                    <b>Preço: <span>R${}10,00</span></b>
                    <b>Descrição: <span>{}Pãobola, duas carnes 180g, frango ou boi,queijo, batata palha,cebola caramelizada sadasdsadasdasdsadsadsad asad sad sadsa dsa</span> </b> 
                    <b>Categoria: <span>{}Hamburguers</span></b>
                </div>
                <div className='buttons-container'>
                    <button className='edit-button'><GrEdit/></button>
                    <button className='delete-button'><TiDelete/></button>
                    
                </div>

            </div>
        </>
    );

}