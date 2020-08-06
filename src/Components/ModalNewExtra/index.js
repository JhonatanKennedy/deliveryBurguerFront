import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Api from '../../services/api';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';

export default function ModalNewExtra(props){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const categorys = props.categorys;

    const validations = yup.object().shape({
      name: yup.string().required('É necessário um nome para o adicional'),
      price: yup.number().typeError('É necessário que seja um numero').required('É necessário um preço para o adicional!'),
      category_id: yup.string().oneOf(categorys.map((obj) => (obj.id)), 'Selecione uma categoria!')
  });

    useEffect(()=>{
      categorys.unshift({id: '', name:'Selecione uma categoria'});
    },[categorys]);


    async function onhandleSubmit(data){
        setShow(false);
        try {
            await Api.post('/admin/extra',data);
        } catch (err) {
            alert(err.message);
        }
        window.location.reload();
    }


    return (
      <>
        <button onClick={handleShow}>Novo Adicional</button>
        <Modal size="sm" show={show} onHide={handleClose}>
        <Formik initialValues={{name:'', price:'',category_id:categorys}}
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
                  <br></br>
                  <Field as='select' name='category_id'>
                  {categorys.map((element) => (
                          <option  value={element.id} key={element.id}>{element.name}</option>
                      ))}
                  </Field>
                  <br></br>
                  <ErrorMessage component='em' name='category_id'/>
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