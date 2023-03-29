import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import {BiComment} from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import {MdSend} from "react-icons/md";
import NoticiaStore from "../store/Store";

const store = new NoticiaStore()
export default function Main() {

    const [show, setShow] = useState(false);
    const [comentarios, setComentarios] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = (coments) => {
        setComentarios(coments);
        setShow(true);
    }

    return (
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
    )

}