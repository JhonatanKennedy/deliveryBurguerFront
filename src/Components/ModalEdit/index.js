import React, {useState, useCallback} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GrEdit } from 'react-icons/gr';
import Api from '../../services/api';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import './style.css';

const validations = yup.object().shape({
    name: yup.string().required('É necessário um nome para o produto!'),
    price: yup.number().required('É necessário um preço para o produto!'),
    description: yup.string().required('É necessário uma descrição para o produto!')
});

export default function ModalEdit(props){

    const [show, setShow] = useState(false);
    const [img, setImg] = useState('');
    const [photoEvent,setPhotoEvent] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id = props.id;
    const name = props.name;
    const price = props.price;
    const description = props.description;
    const category = props.category;

    async function onhandleSubmit(data){
        setShow(false);
        try {
            await Api.put('/admin/product',data);
              if(photoEvent){
                const photo = new FormData();
                photo.append('photo', photoEvent);
                photo.append('product_id', id)
                await Api.patch('/admin/photo', photo);
              }
        } catch (err) {
            alert(err.message);
        }
        window.location.reload();
    }
    const handlePhotoChange = useCallback(async (e) => {
      if(e.target.files[0]){
        setPhotoEvent(e.target.files[0]);
        setImg(URL.createObjectURL(e.target.files[0]))
      }
    },[])
  
    return (
      <>
        <button className='edit-button' onClick={handleShow}><GrEdit/></button>
        <Modal size="lg" show={show} onHide={handleClose}>
        <Formik initialValues={{id:id,name:name, price:price, description:description}}
              onSubmit={(data) => (onhandleSubmit(data))}
              validationSchema={validations}
              >
            <Form>
            <Modal.Header closeButton>
            <Modal.Title>Edição de produto.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='modal-container'>
                <div className='inputs'>         
                  <b>Nome:</b><br></br>
                  <Field placeholder='Digite um nome'name='name' type='input'/>
                  <br></br>
                  <ErrorMessage component='span' name='name'/>
                  <br></br>
                  <b>Preço em R$:</b><br></br>
                  <Field placeholder='Digite um preço'name='price' type='input'/>
                  <br></br>
                  <ErrorMessage component='span' name='price'/>
                  <br></br>
                  <b>Descrição:</b><br></br>
                  <Field placeholder='Digite uma descrição'name='description' component='textarea'/>
                  <br></br>
                  <ErrorMessage component='span' name='description'/>
                  <br></br>
                  <b>Categoria: {category}</b>
                </div>  
                <div className='modal-img-container'>
                  {img && <img src={img} alt='Preview' />}
                  <br></br>
                  <br></br>
                  <input type='file' name='uploadPhoto' onChange={handlePhotoChange}/>
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