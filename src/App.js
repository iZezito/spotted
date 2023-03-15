import React, {useEffect, useState} from "react";
import Nav from "react-bootstrap/Nav";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
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
    <div className="grid-container">
      <div className="container-nav">
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/home">Active</Nav.Link>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav>

      </div>
      <div className="container justify-content-center" style={{width:'100vh', height:'100vh'}}>
          {store.noticias.map((item) => {
            return (
                <Card style={{ width: '50rem' }} key={item.id} className={'justify-content-center mt-3 mb-5'}>
                    <Card.Body>
                        <Card.Title>{item.titulo}</Card.Title>
                        <Card.Text>
                            {item.descricao}
                        </Card.Text>
                        <Card.Subtitle onClick={() => handleShow(item.comentarios)}>{item.comentarios.length} comentários</Card.Subtitle>
                        <input type={'text'} className={'form-text'} onChange={(e) => store.setComentario(e.target.value)}/>
                        <button className={'btn btn-primary'} onClick={() => store.enviarComentario(item.id)}><MdSend/></button>
                    </Card.Body>
                </Card>
            )})
          }
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Comentários</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  {comentarios.map((comentario) =>{
                      return (
                          <ListGroup>
                              <ListGroup.Item>{comentario.texto}</ListGroup.Item>
                          </ListGroup>
                      )
                  })}
              </Modal.Body>
          </Modal>

      </div>
    </div>
    
  );
};

export default App;