import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Api from '../../services/api';
import { TiDelete } from 'react-icons/ti';


export default function ModalDeleteCategory(props){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const category_id = props.id;

    async function onhandleSubmit(){
        setShow(false);
        try {
            await Api.delete(`/admin/category/${category_id}`);
        } catch (err) {
            alert(err.message);
        }
        window.location.reload();
    }


    return (
      <>
        <button className='button-delete' onClick={handleShow}><TiDelete/></button>
        <div className='modal-category'>
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Deletar categoria.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='modal-container'>
                <div className='inputs'>
                  <p>Cuidado! Ao apagar uma categoria, apagará também todos os produtos.<strong style={{color:'#ff5555'}}>Cuidado!!!</strong></p>
                  <br></br>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
                <p>Deseja apagar a categoria <strong style={{color:'#ff5555'}}>{props.name}</strong>?</p>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={onhandleSubmit}>
              Apagar
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </>
    );
}