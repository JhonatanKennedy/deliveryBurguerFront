import React from 'react';
import { Navbar, Nav  } from 'react-bootstrap';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


export default function Header(){
    return(
        <>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/home" >Delivery Burguer</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home">Início</Nav.Link>
                    <Nav.Link href="/products">Produtos</Nav.Link>
                    <Nav.Link href="/additionals">Adicionais</Nav.Link>
                    <Nav.Link href="/users">Clientes</Nav.Link>
                    <Nav.Link href="/orders">Pedidos</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </>
    );
}