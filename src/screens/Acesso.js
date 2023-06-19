import React, { useState } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import fundo from '../images/fundo.jpg'
import AuthStore from "../store/AuthStore";

const Acesso = observer(() => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginSuccessful = await AuthStore.login(username, password);
        console.log(username, password, loginSuccessful);

        if (loginSuccessful) {
            console.log('Login realizado com sucesso!');
            navigate('/');
        }
    };


    return (
        <div className="container position-absolute top-50 start-50 translate-middle bg-success"  style={{backgroundImage: `url(${fundo})`}}>
            <div className="container" style={{marginTop: 45, marginBottom: 45}}>
                <div className="row justify-content-center">
                    <div className="col-xl-4 col-md-6">
                        <div className="container">
                            <p className="text-light">Spotted-Agro é a plataforma perfeita para estudantes do ensino
                                médio e graduação conectarem-se emocionalmente e socialmente.
                                Com recursos de busca personalizados, os usuários podem encontrar potenciais parceiros
                                românticos enquanto compartilham
                                informações e eventos do seu cotidiano. Além disso, a plataforma oferece um espaço
                                seguro para fofocas e discussões,
                                permitindo aos usuários interagirem e criarem uma comunidade ativa e envolvente.
                                Descubra novas amizades, divulgue informações
                                relevantes e divirta-se no Spotted-Agro - a plataforma dos estudantes em busca de amor,
                                divulgação e conexões sociais.
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="card" data-bs-toggle="tooltip" data-bs-placement="top"
                             title="Para fazer o seu login use o mesmo do SIGAA">
                            <div className="card-header text-center text-success">
                                SpottedAgro
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-balloon-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
                                </svg>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3 mt-1 md-textbox">
                                        <input type="text" className={`${username ? 'has-value' : ''}`}
                                               id={'username'}
                                               value={username} onChange={(e) => setUsername(e.target.value)}/>

                                        <label htmlFor={'username'}>Login</label>
                                    </div>
                                    <div className="mb-3 mt-4 md-textbox" >

                                        <input type="password" className={`${password ? 'has-value' : ''}`}
                                               id={'senha'}
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)} />
                                        <label htmlFor={'senha'}>Senha</label>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                            <label className="form-check-label" htmlFor="exampleCheck1">Lembre-se de
                                                mim</label>
                                            <button type={'submit'} className="btn btn-success ms-3">Entrar
                                            </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

});

export default Acesso;
