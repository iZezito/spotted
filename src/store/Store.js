import api from "../service/Configuration";
import {makeAutoObservable} from "mobx";
import AuthStore from "./AuthStore";

class NoticiaStore {
    loading = true
    noticias = []
    user = null
    noticiaAtualId = {}
    comentario = {texto: '', autor: ''}
    respostaComentario = {texto: '', autor: ''}

    constructor() {
        this.user = localStorage.getItem('user');
        makeAutoObservable(this);

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
