import React from "react";
import Container from 'react-bootstrap/Container';
import "./App.css";
import Main from "./screens/Main";
import NotFoundPage from "./screens/NotFoundPage";
import Header from "./components/Header";
import {Routes, Route} from "react-router-dom";
import AuthStore from './store/AuthStore';
import { observer } from "mobx-react";
import Acesso from "./screens/Acesso";


const App = observer(() => {
    const {isAuthenticated, logout} = AuthStore;
    console.log(isAuthenticated);

    return (
        <Container fluid="auto">

            {isAuthenticated && <Header logout={logout} />}
            <Routes>
                {isAuthenticated && <Route exact path="/" element={<Main/>}/>}
                {isAuthenticated && <Route path={"*"} element={<NotFoundPage/>}/>}
                {!isAuthenticated && <Route path={"*"} element={<Acesso />}/>}


            </Routes>
        </Container>

    );
});

export default App;
