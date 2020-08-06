import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Api from '../../services/api';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { GrEdit } from 'react-icons/gr';



export default function ModalEditExtra(props){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const category_name = props.category_name;
    const id = props.id;
    const name = props.name;
    const price = props.price;

    const validations = yup.object().shape({
      name: yup.string().required('É necessário um nome para o adicional'),
      price: yup.number().typeError('É necessário que seja um numero').required('É necessário um preço para o adicional!'),
  });



    async function onhandleSubmit(data){
        setShow(false);
        try {
            await Api.put('/admin/extra',data);
        } catch (err) {
            alert(err.message);
        }
        window.location.reload();
    }


    return (
      <>
        <button onClick={handleShow} className='button-edit'><GrEdit/></button>
        <Modal size="sm" show={show} onHide={handleClose}>
        <Formik initialValues={{id:id,name:name, price:price}}
              onSubmit={(data) => (onhandleSubmit(data))}
              validationSchema={validations}
              >
            <Form>
            <Modal.Header closeButton>
            <Modal.Title>Novo Adicional.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='modal-container'>
                <div className='inputs'>
                  <br></br>
                  <b>Nome:</b><br></br>
                  <Field placeholder='Digite um nome'name='name' type='input'/>
                  <br></br>
                  <ErrorMessage component='em' name='name'/>
                  <br></br>
                  <br></br>
                  <b>Preço:</b><br></br>
                  <Field placeholder='Digite um preço em reais' name='price' />
                  <br></br>
                  <ErrorMessage component='em' name='price'/>
                  <br></br>
                  <br></br>
                  <b>Categoria: {category_name}</b>
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