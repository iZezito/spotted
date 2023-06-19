import api from "../service/Configuration";
import {makeAutoObservable} from "mobx";
import AuthStore from "./AuthStore";

class NoticiaStore {
    noticias = []
    noticiaAtualId = {}
    comentario = {texto: ''}

    constructor() {
        makeAutoObservable(this);
    }

    getNoticias() {
        api.get('noticias', {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.getToken
            }
        }).then((response) => {
            console.log(response.data)
            this.noticias = response.data
        }).catch((erro) => {
                if (erro.response.status === 403) {
                    AuthStore.logout();
                }
            }
        )

    }

    setNoticiaId(noticiaId) {
        this.noticiaAtualId = noticiaId;
    }

    setComentario(comentario) {
        console.log(comentario);
        this.comentario.texto = comentario;
        console.log(this.comentario.texto);
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
            }
        ).finally(() => {
            this.getNoticias();
            this.comentario.texto = '';
        })
    }

}

export default NoticiaStore;
