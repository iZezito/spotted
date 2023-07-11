import React, {useState} from "react";
import {observer} from "mobx-react";
import store from "../store/CadastroStore";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import pdfjs from 'pdfjs-dist';
import api from "../service/Configuration";

const Cadastro = observer(() => {

    const [text, setText] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erros, setErros] = useState({login: '', senha: '', confirmarSenha: ''});

    const handleFileChange = (event) => {
        store.verificarMatricula(event.target.files[0]);
    }



    const handleChangeConfirmarSenha = (event) => {
        setConfirmarSenha(event.target.value);
    }

    const handleChangeLogin = (event) => {
        store.verificarLogin();
        store.setLogin(event.target.value);
    }

    const handleChangeSenha = (event) => {
        store.setSenha(event.target.value);
    }

    const cadastrarUsuario = (event) => {
        event.preventDefault();
        if (store.usuario.senha.length < 6) {
            setErros((errosAntigos) => ({...errosAntigos, senha: 'A senha deve ter no mínimo 6 caracteres'}));
            console.log('entrou senha');
        } else {
            setErros((errosAntigos) => ({...errosAntigos, senha: ''}));
        }

        if (store.usuario.senha !== confirmarSenha) {
            setErros((errosAntigos) => ({...errosAntigos, confirmarSenha: 'As senhas não conferem'}));
            console.log('entrou confirmar senha');
        } else {
            setErros((errosAntigos) => ({...errosAntigos, confirmarSenha: ''}));
        }

        if (store.usuario.login === '') {
            setErros((errosAntigos) => ({...errosAntigos, login: 'O login não pode ser vazio'}));
            console.log('entrou login');
        } else {
            setErros((errosAntigos) => ({...errosAntigos, login: ''}));
        }

        console.log(erros);
        if (isValido()) {
            store.cadastrarUsuario();
        }

    }

    const isValido = () => {
        return !(erros.login || erros.senha || erros.confirmarSenha);

    }

    return (
        <div className="container position-absolute top-50 start-50 translate-middle bg-success"
             style={{maxWidth: '650px'}}>
            <div className="container" style={{marginTop: '45px', marginBottom: '45px'}}>
                <div className="card">
                    <div className="card-header text-center text-success">
                        SpottedAgro
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-balloon-heart-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
                        </svg>
                    </div>
                    <div className="card-body">
                        <form onSubmit={cadastrarUsuario}>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputText" className="form-label">Matrícula</label>
                                    <input type="file" className="form-control" accept=".pdf" id="exampleInputText1"
                                           aria-describedby="textHelp"
                                           onChange={handleFileChange}
                                    />
                                    {store.avisoMatricula && <span className="text-danger">{store.avisoMatricula}</span>}
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Login</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" value={store.usuario.login}
                                           onChange={(e) => handleChangeLogin(e)}/>
                                    {erros.login && <span className="text-danger">{erros.login}</span>}
                                    {store.avisoLogin.contains('válido') ? <span className="text-success">{store.avisoLogin}</span> : <span className="text-danger">{store.avisoLogin}</span>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1"
                                           value={store.usuario.senha}
                                           onChange={(e) => handleChangeSenha(e)}/>
                                    {erros.senha && <span className="text-danger">{erros.senha}</span>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword2" className="form-label">Confirma senha</label>
                                    <input type="password" className="form-control" id="exampleInputPassword2"
                                           onChange={(e) => handleChangeConfirmarSenha(e)}
                                           value={confirmarSenha}
                                    />
                                    {erros.confirmarSenha &&
                                        <span className="text-danger">{erros.confirmarSenha}</span>}
                                </div>
                                <div className="mb-3 form-check">
                                    <button type="submit" className="btn btn-success">
                                        Cadastrar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
});

export default Cadastro;
