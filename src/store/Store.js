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
            console.log(this.noticias)
            let noticiaTemp = this.noticias.find((item) => item.id === idNoticia)
            this.noticias[noticiaTemp].comentarios.push(this.comentario)
            console.log(this.noticias[noticiaTemp].comentarios)
            }).catch((erro) => console.log(erro))
    }

}

export default NoticiaStore;
