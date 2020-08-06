import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Api from '../../services/api';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { GrEdit } from 'react-icons/gr';

const validations = yup.object().shape({
    name: yup.string().required('É necessário um nome para o produto!'),
});
  
export default function ModalEditCategory(props){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const id = props.id;


    async function onhandleSubmit(data){
        setShow(false);
        const category = {id:id,name:data.name}
        try {
            await Api.put('/admin/category',category);
        } catch (err) {
            alert(err.message);
        }
        window.location.reload();
    }


    return (
      <>
        <button className='button-edit' onClick={handleShow}><GrEdit/></button>
        <Modal size="sm" show={show} onHide={handleClose}>
        <Formik initialValues={{name:''}}
              onSubmit={(data) => (onhandleSubmit(data))}
              validationSchema={validations}
              >
            <Form>
            <Modal.Header closeButton>
            <Modal.Title>Editar categoria.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='modal-container'>
                <div className='inputs'>
                  <br></br>
                  <b>Nome:</b><br></br>
                  <Field placeholder='Digite um nome'name='name' type='input'/>
                  <br></br>
                  <br></br>
                  <ErrorMessage component='em' name='name'/>
                  <br></br>
                  <br></br>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" type='submit'>
              Salvar mudanças
            </Button>
          </Modal.Footer>
          </Form>
        </Formik>
        </Modal>
      </>
    );
}