import React from "react";
import GenericTable from "../components/GenericTable";

export default function GenericScreen(){
    const listaObjetos = [];

    for (let i = 0; i < 50; i++) {
        const objeto = {
            nome: `Pessoa ${i + 1}`,
            idade: Math.floor(Math.random() * 50) + 18,
            altura: Math.floor(Math.random() * 50) + 150,
        };

        listaObjetos.push(objeto);
    }

    return <GenericTable objetos={listaObjetos} />
}

