import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { BiComment } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import { BsNewspaper, BsHeart, BsChat, BsEnvelopeHeart, BsEar, BsPersonCircle, BsGear, BsBoxArrowRight } from "react-icons/bs"
import { MdSend } from "react-icons/md";
import NoticiaStore from "../store/Store";
import { observer } from "mobx-react";
import { set } from "mobx";


const store = new NoticiaStore()
export default observer(function Main() {

    const [show, setShow] = useState(false);
    const [indexNoticia, setIndexNoticia] = useState(0)
    const [cont, setCont] = useState(0)

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setIndexNoticia(id)
        setShow(true);
    }

    return (

        <div className="card mb-3 container-fluid border-success bg-light overflow-auto" style={{ maxWidth: 1360, marginTop: 70 }}
        >
            <div className="container">
                <h1 className="text-center">
                    <BsNewspaper color="black" />
                    Notícias
                </h1>
            </div>
            {
                store.noticias.map((item, index) => {
                    return (
                        <Card className="card mb-3 container-fluid" style={{ maxWidth: 1080, marginTop: 10 }}>
                            <Card.Body>
                                <Card.Title>{item.titulo}</Card.Title>
                                <Card.Text>{item.descricao}</Card.Text>
                                <Card.Text><small className="text-body-secondary">Last updated 3 mins ago</small></Card.Text>
                            </Card.Body>
                            <div className="card-body">

                            </div>
                            <div className="card-footer">
                                <div className="gap-2 d-md-flex justify-content-md-end">
                                    <div className="icon-container" style={{marginTop: 2}}>
                                        <BsHeart color="red" size={30}  onClick={() => setCont(cont+1)}/>
                                        <span className="icon-label">{cont}</span>

                                    </div>
                                    <div className="icon-container">
                                        <BsChat color="green" className="icon" size={30} onClick={
                                            () => {
                                                handleShow(index)
                                                store.setNoticiaId(item.id)
                                            }} />
                                        <span className="icon-label">{item.comentarios.length}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )
                })
            }



            {/* {store.noticias.map((item, index) => {
                return (
                    <Card style={{ maxWidth: 'auto' }} key={item.id} className={'justify-content-center mt-3 mb-5 bg-dark'} fluid="auto">
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
                                <p className={'text-light'}>Comentários {item.comentarios.length}<BiComment size={20} color={'white'} /></p>
                            </Card.Subtitle>

                        </Card.Body>
                    </Card>
                )
            }) */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className={'text-center'}>Comentários</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {store.noticias[indexNoticia].comentarios.map((comentario) => {
                        return <p>{comentario.texto}</p>
                    })}
                    <input type={'text'} className={'form-text'} value={store.comentario.texto}
                        onChange={(e) => store.setComentario(e.target.value)} />

                    <MdSend onClick={() => store.enviarComentario()}
                        style={{ borderRadius: 20 }} size={25} color={'black'} className={'ms-2 mb-1'} />
                </Modal.Body>
            </Modal>

        </div>
    )

})