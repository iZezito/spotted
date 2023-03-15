import React, {useEffect, useState} from "react";
import Nav from "react-bootstrap/Nav";
import Card from 'react-bootstrap/Card';
import Modal from "react-bootstrap/Modal";
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import "./App.css";
import NoticiaStore from "./store/Store";
import {MdSend} from "react-icons/md";
import {BiUserCircle, BiExit, BiNews, BiComment} from "react-icons/bi"
import {GiLoveLetter, GiAcousticMegaphone} from "react-icons/gi"
import {FaBars} from "react-icons/fa"

const store = new NoticiaStore()
const App = () => {

    const [show, setShow] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [comentarios, setComentarios] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = (coments) => {
        setComentarios(coments);
        setShow(true);
    }
    const handleCloseNav = () => setShowNav(false);
    const handleShowNav = () => {
        console.log('chamou!')
        setShowNav(true);
    }


    return (
        <Container fluid="auto">
        <div className="grid-container bg-dark">
            <FaBars color="white" className="topButton ms-4 mt-3" onClick={handleShowNav} size={35}/>
            <Offcanvas show={showNav} onHide={handleCloseNav} className="bg-dark">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="text-light">Spotted</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>    
                        <Nav defaultActiveKey="/home" className="flex-column">
                            <Nav.Link eventKey="link-4"><BiUserCircle size={30}/>Perfil</Nav.Link>
                            <Nav.Link href="/home"><BiNews size={30}/>Feed de noticias</Nav.Link>
                            <Nav.Link eventKey="link-1"><GiLoveLetter size={30}/>Deixar recadinho</Nav.Link>
                            <Nav.Link eventKey="link-2"><GiAcousticMegaphone size={30}/>Fofocar</Nav.Link>
                            <Nav.Link eventKey="link-3"><BiExit size={30}/>Sair</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            <div className="container-nav">
                
                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link eventKey="link-4"><BiUserCircle size={30}/>Perfil</Nav.Link>
                    <Nav.Link href="/home"><BiNews size={30}/>Feed de noticias</Nav.Link>
                    <Nav.Link eventKey="link-1"><GiLoveLetter size={30}/>Deixar recadinho</Nav.Link>
                    <Nav.Link eventKey="link-2"><GiAcousticMegaphone size={30}/>Fofocar</Nav.Link>
                    <Nav.Link eventKey="link-3"><BiExit size={30}/>Sair</Nav.Link>
                </Nav>

            </div>
            <div className="main container justify-content-center overflow-auto" style={{ overflowY:'scroll'}}>
                {store.noticias.map((item) => {
                    return (
                        <Card style={{maxWidth: 'auto'}} key={item.id} className={'justify-content-center mt-3 mb-5 bg-dark'} fluid="auto">
                            <Card.Body>
                                <Card.Title className={'text-center text-light'}>{item.titulo}</Card.Title>
                                <Card.Text className={'text-light'}>
                                    {item.descricao}
                                </Card.Text>
                                <Card.Subtitle className={'text-light'} onClick={() => handleShow(item.comentarios)}>
                                    <p className={'text-light'}>Comentários {item.comentarios.length}<BiComment size={20} color={'white'}/></p>
                                </Card.Subtitle> 

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
                         <input type={'text'} className={'form-text text-light bg-dark'}
                                       onChange={(e) => store.setComentario(e.target.value)}/>

                                <MdSend onClick={() => store.enviarComentario()}
                                        style={{borderRadius: 20}} size={25} color={'white'} className={'ms-2 mb-1'}/>
                    </Modal.Body>
                </Modal>

            </div>
        </div>
        </Container>

    );
}
    ;

    export default App;