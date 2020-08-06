import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Api from '../../services/api';
import { TiDelete } from 'react-icons/ti';


export default function ModalDeleteExtra(props){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const id = props.id;


    async function onhandleSubmit(){
        setShow(false);
        try {
            await Api.delete(`/admin/extra/${id}`);
        } catch (err) {
            alert(err.message);
        }
        window.location.reload();
    }


    return (
      <>
        <button className='button-delete' onClick={handleShow}><TiDelete/></button>
        <div className='modal-category'>
        <Modal size="sm" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Deletar Adicional.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Deseja apagar o adicional <strong style={{color:'#ff5555'}}>{props.name}</strong>?</p>
            </Modal.Body>
            <Modal.Footer>
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