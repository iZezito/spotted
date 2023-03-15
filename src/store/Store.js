import api from "../service/Configuration";
import {makeAutoObservable} from "mobx";

class NoticiaStore {
    noticias = []
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

    setComentario(comentario) {
        this.comentario.texto = comentario;
    }

    enviarComentario(idNoticia) {
        api.post(`comentarios/${idNoticia}`, this.comentario).then((response) => {
            this.comentario.texto = '';
            }).catch((erro) => console.log(erro))
    }

}

export default NoticiaStore;
