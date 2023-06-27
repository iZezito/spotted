import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import {
    BsNewspaper,
    BsHeart,
    BsChat,
    BsThreeDotsVertical,
} from "react-icons/bs"
import {MdSend} from "react-icons/md";
import NoticiaStore from "../store/Store";
import {observer} from "mobx-react";

const store = new NoticiaStore()
export default observer(function Main() {

    const [show, setShow] = useState(false);
    const [indexNoticia, setIndexNoticia] = useState(0)
    const [replyingToCommentId, setReplyingToCommentId] = useState(null);
    const [expandedComments, setExpandedComments] = useState([]);

    const handleVerRespostas = (commentId) => {
        if (expandedComments.includes(commentId)) {
            setExpandedComments(expandedComments.filter(id => id !== commentId));
        } else {
            setExpandedComments([...expandedComments, commentId]);
        }
    };

    useState(() => {
        store.getNoticias();
        console.log(store.user)
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setIndexNoticia(id)
        setShow(true);
    }

    return (

        <div className="card mb-3 container-fluid border-success bg-light overflow-auto"
             style={{maxWidth: 1360, marginTop: 70}}
        >
            <div className="container">
                <h1 className="text-center">
                    <BsNewspaper color="black"/>
                    Notícias
                </h1>
            </div>
            {
                store.noticias?.map((item, index) => {
                    return (
                        <Card className="card mb-3 container-fluid" style={{maxWidth: 1080, marginTop: 10}}
                              key={item.id}>
                            <Card.Body>
                                <Card.Title>{item?.titulo}</Card.Title>
                                <Card.Text>{item?.descricao}</Card.Text>
                                <Card.Text><small className="text-body-secondary">Last updated 3 mins
                                    ago</small></Card.Text>
                            </Card.Body>
                            <div className="card-body">

                            </div>
                            <div className="card-footer">
                                <div className="gap-2 d-md-flex justify-content-md-end">
                                    <div className="icon-container" style={{marginTop: 2}}>
                                        <BsHeart color="red" size={30}/>
                                        <span className="icon-label">{0}</span>

                                    </div>

                                    <div className="icon-container" onClick={
                                        () => {
                                            handleShow(index)
                                            store.setNoticiaId(item.id)
                                        }}>
                                        <BsChat color="green" className="icon" size={30}/>
                                        <span className="icon-label">{item?.comentarios.length}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )
                })
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className={'text-center'}>Comentários</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {store.noticias[indexNoticia]?.comentarios.map((comentario) => {
                        return (
                            <div className={'container'} key={comentario.id}>
                                <div className={'comentario-texto mt-2'}>
                                    <p className={'text-start ps-1'}>{comentario.texto}

                                        <button className={'btn-delete'} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <BsThreeDotsVertical/>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="">Editar</a></li>
                                                <li><a className="dropdown-item" href="">Excluir</a></li>
                                            </ul>

                                        </button>
                                    </p>
                                    <div className={'d-flex flex-row justify-content-end'}>
                                        <button className={'nav-link btn-responder ms-1 resp'}
                                                onClick={() => setReplyingToCommentId(comentario.id)}>responder
                                        </button>
                                        {comentario?.respostas.length > 0 && (
                                            <button className={'nav-link btn-responder ms-1 resp'}
                                                    onClick={() => handleVerRespostas(comentario.id)}>
                                                {expandedComments.includes(comentario.id) ? 'ocultar respostas' : 'ver respostas'}
                                            </button>)}
                                    </div>

                                </div>

                                {comentario?.respostas.length > 0 && expandedComments.includes(comentario.id) &&
                                    comentario?.respostas.map((resposta) => {
                                        return (
                                            <div key={resposta.id}>
                                                <p className={'text-start ms-5 mt-2 resposta-texto ps-1'}>{resposta.texto}</p>
                                            </div>
                                        );
                                    })}
                                {replyingToCommentId === comentario.id && (
                                    <div className={'text-start ms-5 mb-2 ps-1'}>
                                        <input
                                            type={'text'}
                                            className={'form-text'}
                                            placeholder={'Digite sua resposta...'}
                                            value={store.respostaComentario.texto}
                                            onChange={(e) => store.setRespostaComentario(e.target.value)}
                                        />
                                        <button
                                            className={'btn-icon'}
                                            disabled={!store.respostaComentario.texto}
                                            onClick={() => store.enviarRespostaComentario(comentario.id)}>
                                            <MdSend
                                                style={{borderRadius: 20}} size={25}
                                                color={!store.respostaComentario.texto ? 'black' : 'gray'}
                                                className={'ms-1 mb-1'}/>

                                        </button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    <input type={'text'} className={'form-text'} placeholder={'Digite seu comentário...'}
                           value={store.comentario.texto}
                           onChange={(e) => store.setComentario(e.target.value)}/>
                    <button
                        className={'btn-icon'}
                        onClick={() => store.enviarComentario()}
                        disabled={!store.comentario.texto}>

                        <MdSend

                            style={{borderRadius: 20}} size={25}
                            color={store.respostaComentario.texto ? 'black' : 'gray'} className={'ms-1 mb-1'}/>
                    </button>
                </Modal.Body>
            </Modal>

        </div>
    )

})
