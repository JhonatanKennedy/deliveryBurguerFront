import React, {useState, useEffect, useCallback} from 'react';
import { Modal, Button } from 'react-bootstrap';
import Api from '../../services/api';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';


export default function ModalNew(props){

    const [show, setShow] = useState(false);
    const [img, setImg] = useState('');
    const [photoEvent,setPhotoEvent] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const categorys = props.categorys;

    useEffect(()=>{
      categorys.unshift({id: '', name:'Selecione uma categoria'});
    },[categorys]);

    async function onhandleSubmit(data){
        setShow(false);
        try {
            const response = await Api.post('/admin/product',data);
              if(photoEvent){
                const photo = new FormData();
                photo.append('photo', photoEvent);
                photo.append('product_id', response.data.id);
                await Api.patch('/admin/photo', photo);
              }
        } catch (err) {
            alert(err.message);
        }
        window.location.reload();
    }

    const handlePhotoChange = useCallback(async (e) => {
      if(e.target.files[0]){
        setPhotoEvent(e.target.files[0])
        setImg(URL.createObjectURL(e.target.files[0]))
      }
    },[])

    const validations = yup.object().shape({
      name: yup.string().required('É necessário um nome para o produto!'),
      price: yup.number().typeError('É necessário que seja um numero').required('É necessário um preço para o produto!'),
      description: yup.string().required('É necessário uma descrição para o produto!'),
      category_id: yup.string().oneOf(categorys.map((obj) => (obj.id)), 'Selecione uma categoria!')
  });
  
    return (
      <>
        <button className='new-product' onClick={handleShow}>Novo produto</button>
        <Modal size="lg" show={show} onHide={handleClose}>
        <Formik initialValues={{name:'', price:'', description:'',category_id:categorys}}
              onSubmit={(data) => (onhandleSubmit(data))}
              validationSchema={validations}
              >
            <Form>
            <Modal.Header closeButton>
            <Modal.Title>Adiciconar produto.</Modal.Title>
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
                  <b>Preço em R$:</b><br></br>
                  <Field placeholder='Digite um preço'name='price' type='input' />
                  <br></br>
                  <ErrorMessage component='em' name='price'/>
                  <br></br>
                  <b>Descrição:</b><br></br>
                  <Field placeholder='Digite uma descrição'name='description' component='textarea'/>
                  <br></br>
                  <ErrorMessage component='em' name='description'/>
                  <br></br>
                  <Field as='select' name='category_id'>
                  {categorys.map((element) => (
                          <option  value={element.id} key={element.id}>{element.name}</option>
                      ))}
                  </Field>
                  <br></br>
                  <ErrorMessage component='em' name='category_id'/>
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