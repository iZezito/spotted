//Extração do componente comentários
import React, {useState} from 'react';
import {
    BsHeartFill,
    BsEnvelopeHeart,
    BsEar,
    BsPersonCircle,
    BsGear,
    BsBoxArrowRight,
    BsThreeDotsVertical
} from "react-icons/bs";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import Store from "../store/AuthStore";
import Modal from "react-bootstrap/Modal";
import {MdSend} from "react-icons/md";
import Button from "react-bootstrap/Button";

const store = new Store();

const Comentarios = observer(() => {

    const [replyingToCommentId, setReplyingToCommentId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [editingReplyId, setEditingReplyId] = useState(0);
    const [editedReply, setEditedReply] = useState('');
    const [expandedComments, setExpandedComments] = useState([]);
    const [smShow, setSmShow] = useState(false);

    const handleVerRespostas = (commentId) => {
        if (expandedComments.includes(commentId)) {
            setExpandedComments(expandedComments.filter(id => id !== commentId));
        } else {
            setExpandedComments([...expandedComments, commentId]);
        }
    };


   return (
         <>
             <Modal show={show} onHide={handleClose}>
                 <Modal.Header closeButton>
                     <Modal.Title className={'text-center'}>Comentários</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     {store.noticias[indexNoticia]?.comentarios.map((comentario) => {
                         const isReplyingToComment = editingCommentId === comentario.id;
                         return (
                             <div className={'container'} key={comentario.id}>
                                 <div className={'comentario-texto mt-2'}>
                                     <div className={'d-flex flex-row justify-content-between'}>
                                         {isReplyingToComment ? (
                                             <>
                                                 <input
                                                     type={'text'}
                                                     className={'input-edit'}
                                                     style={{border: 'none', width: '80%'}}
                                                     value={store.comentarioEdit.texto}
                                                     onChange={(e) => store.setComentarioEdit(e.target.value)}
                                                 />
                                                 <button
                                                     onClick={() => setEditingCommentId(null)}
                                                     className={'btn-icon text-danger'}>
                                                     cancelar
                                                 </button>
                                                 <button
                                                     className={'btn-icon'}
                                                     onClick={() => store.updateComentario(comentario.id)}
                                                     disabled={!store.comentarioEdit.texto}>

                                                     <MdSend

                                                         style={{borderRadius: 20}} size={25}
                                                         color={store.comentarioEdit.texto ? 'black' : 'gray'} className={'ms-1 mb-1'}/>
                                                 </button>
                                             </>


                                         ) : (
                                             <>
                                                 <p className={'text-start ps-1 coment'}>{comentario.texto}</p>
                                                 {comentario.autor === store.user && (
                                                     <div className={'d-flex flex-column'}>
                                                         <button className={'align-self-end ms-auto btn-delete'} type="button"
                                                                 data-bs-toggle="dropdown" aria-expanded="false">
                                                             <BsThreeDotsVertical/>
                                                             <ul className="dropdown-menu">
                                                                 <li className="dropdown-item" onClick={() => {
                                                                     setEditingCommentId(comentario.id);
                                                                     setEditedComment(comentario.texto);
                                                                     store.setComentarioEdit(comentario.texto)
                                                                 }}>Editar</li>
                                                                 <li className="dropdown-item" onClick={() => {
                                                                     setSmShow(true)
                                                                     setShow(false)
                                                                     store.setComentarioDeleteId(comentario.id)
                                                                     store.setRespostaDeleteId(null)
                                                                 }}>Excluir</li>
                                                             </ul>
                                                         </button>
                                                     </div>
                                                 )}
                                             </>
                                         )}


                                     </div>
                                     { !isReplyingToComment && (
                                         <div className={'d-flex flex-row justify-content-end'}>
                                             <button className={'nav-link btn-responder ms-1 resp'}
                                                     onClick={() => setReplyingToCommentId(comentario.id)}>responder
                                             </button>
                                             {comentario?.respostas?.length > 0 && (
                                                 <button className={'nav-link btn-responder ms-1 resp'}
                                                         onClick={() => handleVerRespostas(comentario.id)}>
                                                     {expandedComments.includes(comentario.id) ? 'ocultar respostas' : 'ver respostas'}
                                                 </button>)}
                                         </div>
                                     )}
                                 </div>

                                 {comentario?.respostas?.length > 0 && expandedComments.includes(comentario.id) &&
                                     comentario?.respostas.map((resposta) => {
                                         const isReplyingToResponse = editingReplyId === resposta.id;

                                         return (
                                             <div className={'resposta-texto ms-5 mt-2 ps-1'}>
                                                 <div key={resposta.id}
                                                      className={'d-flex flex-row justify-content-between'}>
                                                     {isReplyingToResponse ? (
                                                         <>
                                                             <input
                                                                 type={'text'}
                                                                 className={'input-edit'}
                                                                 style={{border: 'none', width: '80%'}}
                                                                 value={store.respostaEdit.texto}
                                                                 onChange={(e) => store.setRespostaEdit(e.target.value)}
                                                             />
                                                             <button
                                                                 onClick={() => setEditingReplyId(null)}
                                                                 className={'btn-icon'}>
                                                                 cancelar
                                                             </button>

                                                             <button
                                                                 className={'btn-icon'}
                                                                 onClick={() => store.updateResposta(resposta.id)}
                                                                 disabled={!store.respostaEdit.texto}>
                                                                 <MdSend
                                                                     style={{borderRadius: 20}} size={25}
                                                                     color={store.respostaEdit.texto ? 'black' : 'gray'} className={'ms-1 mb-1'}/>
                                                             </button>
                                                         </>
                                                     ) : (
                                                         <>
                                                             <p className={'text-start'}>{resposta.texto}</p>
                                                             {resposta.autor === store.user && (
                                                                 <div className={'d-flex flex-column'}>
                                                                     <button className={'align-self-end ms-auto btn-delete'}
                                                                             type="button" data-bs-toggle="dropdown"
                                                                             aria-expanded="false">
                                                                         <BsThreeDotsVertical/>
                                                                         <ul className="dropdown-menu">
                                                                             <li className="dropdown-item"
                                                                                 onClick={() => {
                                                                                     setEditingReplyId(resposta.id);
                                                                                     setEditedReply(resposta.texto);
                                                                                     store.setRespostaEdit(resposta.texto)
                                                                                 }}
                                                                             >Editar</li>
                                                                             <li className="dropdown-item"
                                                                                 onClick={() => {
                                                                                     setSmShow(true)
                                                                                     setShow(false)
                                                                                     store.setRespostaDeleteId(resposta.id)
                                                                                     store.setComentarioDeleteId(comentario.id)
                                                                                 }}
                                                                             >Excluir</li>
                                                                         </ul>
                                                                     </button>
                                                                 </div>
                                                             )}
                                                         </>
                                                     )}

                                                 </div>
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
                                                 color={store.respostaComentario.texto ? 'black' : 'gray'}
                                                 className={'ms-1 mb-1'}/>

                                         </button>
                                     </div>
                                 )}
                             </div>
                         )
                     })}
                     <input type={'text'} className={'form-text ms-3'} placeholder={'Digite seu comentário...'}
                            value={store.comentario.texto}
                            onChange={(e) => store.setComentario(e.target.value)}/>
                     <button
                         className={'btn-icon'}
                         onClick={() => store.enviarComentario()}
                         disabled={!store.comentario.texto}>

                         <MdSend

                             style={{borderRadius: 20}} size={25}
                             color={store.comentario.texto ? 'black' : 'gray'} className={'ms-1 mb-1'}/>
                     </button>
                 </Modal.Body>
             </Modal>
             <Modal
                 size="sm"
                 show={smShow}
                 onHide={() => {
                     setSmShow(false)
                     setShow(true)
                 }}
                 aria-labelledby="example-modal-sizes-title-sm"
             >
                 <Modal.Header closeButton>
                     <Modal.Title id="example-modal-sizes-title-sm">
                         Excluir {store.respostaDeleteId ? 'Resposta' : 'Comentário'}?
                     </Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     Tem certeza que deseja excluir {store.respostaDeleteId ? 'este comentário' : 'esta resposta'}?
                 </Modal.Body>
                 <Modal.Footer>
                     <Button variant="secondary" onClick={() => {
                         setSmShow(false)
                         setShow(true)
                     }}>Cancelar</Button>
                     <Button variant="danger" onClick={handleDeleteRespostaComentario}>Excluir</Button>
                 </Modal.Footer>
             </Modal>
         </>
   )
});
