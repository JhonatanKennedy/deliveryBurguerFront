import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

export default function ModalDelete(){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { signOut } = useContext(AuthContext);

    return (
      <>
        <Button variant='warning' onClick={handleShow}>Logout</Button>
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <b>Tem certeza que deseja sair?</b>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={signOut}>
              Sair
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}