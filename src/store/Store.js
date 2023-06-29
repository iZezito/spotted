import api from "../service/Configuration";
import {makeAutoObservable} from "mobx";
import AuthStore from "./AuthStore";
import {type} from "@testing-library/user-event/dist/type";
import {string} from "sockjs-client/lib/utils/random";
import data from "bootstrap/js/src/dom/data";

class NoticiaStore {
    comentarioEdit = {autor: '', texto: ''}
    respostaEdit = {autor: '', texto: ''}
    loading = true
    noticias = []
    user = null
    noticiaAtualId = {}
    comentario = {texto: '', autor: ''}
    respostaComentario = {texto: '', autor: ''}

    constructor() {
        makeAutoObservable(this);
        this.user = localStorage.getItem('user');

    }

    getNoticias() {
        api.get('noticias', {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            this.loading = false
            console.log(response.data)
            this.noticias = response.data
        }).catch((erro) => {
            if (erro.response.status === 403) {
                AuthStore.logout();
            }
        })

    }

    setNoticiaId(noticiaId) {
        this.noticiaAtualId = noticiaId;
    }

    setComentarioEdit(comentario) {
        console.log(comentario);
        this.comentarioEdit.texto = comentario;
        console.log(typeof (this.comentarioEdit))
    }

    setRespostaEdit(respostaComentario) {
        console.log(respostaComentario);
        this.respostaEdit.texto = respostaComentario;
        console.log(typeof (this.respostaComentarioEdit))
    }

    updateResposta(respostaComentarioId) {
        api.patch(`respostas/${respostaComentarioId}`, this.respostaEdit, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            console.log(response.data);
            this.respostaComentarioEdit.texto = '';
        }).catch((erro) => {
            console.log(erro);
            if (erro.response.status === 403) {
                AuthStore.logout();
            }
        })
    }
    updateComentario(comentarioId) {
        api.patch(`comentarios/${comentarioId}`, this.comentarioEdit, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            console.log(response.data);
            this.comentarioEdit.texto = '';
        }).catch((erro) => {
            console.log(erro);
            if (erro.response.status === 403) {
                AuthStore.logout();
            }
        })
    }

    setComentario(comentario) {
        console.log(comentario);
        this.comentario.texto = comentario;
        this.comentario.autor = this.user;
        console.log(this.comentario.texto);
        console.log(this.comentario.user);
    }
    setRespostaComentario(respostaComentario) {
        console.log(respostaComentario);
        this.respostaComentario.texto = respostaComentario;
        this.respostaComentario.autor = this.user;
        console.log(this.respostaComentario.texto);
        console.log(this.respostaComentario.user);
    }

    enviarComentario() {
        api.post(`comentarios/${this.noticiaAtualId}`, this.comentario, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {

        }).catch((erro) => {
            if (erro.response.status === 403) {
                AuthStore.logout();
            }
        }).finally(() => {
            this.comentario.texto = '';
        })
    }

    enviarRespostaComentario(comentarioId) {
        api.post(`respostas/${comentarioId}`, this.respostaComentario, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            this.noticias[this.noticias.findIndex(noticia => noticia.id === this.noticiaAtualId)].comentarios[this.noticias[this.noticias.findIndex(noticia => noticia.id === this.noticiaAtualId)].comentarios.findIndex(comentario => comentario.id === comentarioId)].respostas.push(response.data);
            console.log(response.data);
            this.respostaComentario.texto = '';
        }).catch((erro) => {
            if (erro.response.status === 403) {
                AuthStore.logout();
            }
            console.log(erro);
        })
    }

    getUserName() {
        return this.user;
    }

}

export default NoticiaStore;
