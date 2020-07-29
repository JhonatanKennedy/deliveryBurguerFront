import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TiDelete } from 'react-icons/ti';
import Api from '../../services/api';

export default function ModalDelete(props){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id = props.id;

    async function onhandleClick(){
        setShow(false);
        try {
            await Api.delete(`admin/product/${id}`);
        } catch (err) {
            alert(err.message);
        }
        window.location.reload();
    }
  
    return (
      <>
        <button className='delete-button' onClick={handleShow}><TiDelete/></button>
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edição de produto.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <b>Tem certeza que deseja deletar esse produto?</b>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={onhandleClick}>
              Deletar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}