import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Logout from '../Logout/index';

export default function Header(){
    return(
        <>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/home" >Delivery Burguer</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home">Início</Nav.Link>
                    <Nav.Link as={Link} to="/categorys">Categorias</Nav.Link>
                    <Nav.Link as={Link} to="/products">Produtos</Nav.Link>
                    <Nav.Link as={Link} to="/additionals">Adicionais</Nav.Link>
                    <Nav.Link as={Link} to="/users">Clientes</Nav.Link>
                    <Nav.Link as={Link} to="/orders">Pedidos</Nav.Link>
                    <Logout/>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </>
    );
}