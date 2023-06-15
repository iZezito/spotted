import api from "../service/Configuration";
import {makeAutoObservable} from "mobx";

class NoticiaStore {
    noticias = []
    noticiaAtualId = {}
    comentario = {texto:''}

    constructor() {
        makeAutoObservable(this);
        this.getNoticias();
    }

    getNoticias() {
        api.get('noticias').then((response) => {
            console.log(response.data)
            this.noticias = response.data
        }).catch((erro) => console.log(erro))

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
        api.post(`comentarios/${this.noticiaAtualId}`, this.comentario).then((response) => {
            }).catch((erro) => console.log(erro)).finally(() => {
                this.getNoticias();
                this.comentario.texto = '';
            })
        }

}

export default NoticiaStore;
