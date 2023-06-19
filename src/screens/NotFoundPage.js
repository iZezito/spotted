import React from "react";
import {Link} from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold text-dark">404</h1>
                <p className="fs-3 text-dark"><span className="text-danger">Opps!</span> Página não encontrada</p>
                <p className="lead text-dark">
                    A página que você está procurando não existe ou foi movida.
                </p>
                <Link to={'/'} className="btn btn-primary text-light">Ir para o início</Link>
            </div>
        </div>
    )
}
