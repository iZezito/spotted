import React from 'react';
import {Table} from "react-bootstrap";


export default function GenericTable({ objetos }) {

    const atributosUnicos = Array.from(
        objetos.reduce((atributos, objeto) => {
            Object.keys(objeto).forEach((atributo) => atributos.add(atributo));
            return atributos;
        }, new Set())
    );

    return (
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                {atributosUnicos.map((atributo) => (
                    <th key={atributo}>{atributo}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {objetos.map((objeto, index) => (
                <tr key={index}>
                    {atributosUnicos.map((atributo) => (
                        <td key={atributo}>{objeto[atributo]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
    );
}