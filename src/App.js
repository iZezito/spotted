import React, {useEffect, useState} from "react";
import Nav from "react-bootstrap/Nav";
import Card from 'react-bootstrap/Card';
import Modal from "react-bootstrap/Modal";
import "./App.css";
import NoticiaStore from "./store/Store";
import {MdSend} from "react-icons/md";

const store = new NoticiaStore()
const App = () => {

    const [show, setShow] = useState(false);
    const [comentarios, setComentarios] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = (coments) => {
        setComentarios(coments);
        setShow(true);
    }


    return (
        <div className="grid-container bg-dark">
            <div className="container-nav">
                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link href="/home">Active</Nav.Link>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav>

            </div>
            <div className="container justify-content-center" style={{width: '100vh', height: '100vh'}}>
                {store.noticias.map((item) => {
                    return (
                        <Card style={{width: '50rem'}} key={item.id} className={'justify-content-center mt-3 mb-5 bg-dark'}>
                            <Card.Body>
                                <Card.Title className={'text-center text-light'}>{item.titulo}</Card.Title>
                                <Card.Text className={'text-light'}>
                                    {item.descricao}
                                </Card.Text>
                                <Card.Subtitle className={'text-light'}
                                    onClick={() => handleShow(item.comentarios)}>{item.comentarios.length} comentários</Card.Subtitle>
                                <input type={'text'} className={'form-text text-light bg-dark'}
                                       onChange={(e) => store.setComentario(e.target.value)}/>

                                <MdSend onClick={() => store.enviarComentario(item.id)}
                                        style={{borderRadius: 20}} size={25} color={'white'} className={'ms-2 mb-1'}/>

                            </Card.Body>
                        </Card>
                    )
                })
                }
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className={'text-center'}>Comentários</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {comentarios.map((comentario) => {
                            return (
                                <p>{comentario.texto}</p>
                            )
                        })}
                    </Modal.Body>
                </Modal>

            </div>
        </div>

    );
}
    ;

    export default App;