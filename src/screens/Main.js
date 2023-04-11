import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import {BiComment} from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import {MdSend} from "react-icons/md";
import NoticiaStore from "../store/Store";
import {observer} from "mobx-react";

const store = new NoticiaStore()
export default observer(function Main() {

    const [show, setShow] = useState(false);
    const [indexNoticia, setIndexNoticia] = useState(0)

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setIndexNoticia(id)
        setShow(true);
    }

    return (
        <div className="main container justify-content-center overflow-auto"
        >
            {store.noticias.map((item, index) => {
                return (
                    <Card style={{maxWidth: 'auto'}} key={item.id} className={'justify-content-center mt-3 mb-5 bg-dark'} fluid="auto">
                        <Card.Body>
                            <Card.Title className={'text-center text-light'}>{item.titulo}</Card.Title>
                            <Card.Text className={'text-light'}>
                                {item.descricao}
                            </Card.Text>
                            <Card.Subtitle className={'text-light'} onClick={() => {
                                handleShow(index)
                                store.setNoticiaId(item.id)
                            }
                            }>
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
                    {store.noticias[indexNoticia].comentarios.map((comentario) => {
                        return <p>{comentario.texto}</p>
                    })}
                    <input type={'text'} className={'form-text'} value={store.comentario.texto}
                           onChange={(e) => store.setComentario(e.target.value)}/>

                    <MdSend onClick={() => store.enviarComentario()}
                            style={{borderRadius: 20}} size={25} color={'black'} className={'ms-2 mb-1'}/>
                </Modal.Body>
            </Modal>

        </div>
    )

})