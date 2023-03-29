import React, {useEffect, useState} from "react";
import Nav from "react-bootstrap/Nav";
import Card from 'react-bootstrap/Card';
import Modal from "react-bootstrap/Modal";
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import "./App.css";
import NoticiaStore from "./store/Store";
import {MdSend} from "react-icons/md";
import {BiUserCircle, BiExit, BiNews, BiComment} from "react-icons/bi"
import {GiLoveLetter, GiAcousticMegaphone} from "react-icons/gi"
import {FaBars} from "react-icons/fa"
import Main from "./screens/Main";
import NotFoundPage from "./screens/NotFoundPage";
import Header from "./components/Header";
import {Routes, Route} from "react-router-dom";
import GPTValidation from "./screens/GPTValidation";

const store = new NoticiaStore()
const App = () => {


    return (
        <Container fluid="auto">
        <div className="grid-container bg-dark">
            <Header/>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/recados" element={<GPTValidation/>}/>
                <Route exact path={"*"} element={<NotFoundPage/>}/>
            </Routes>

        </div>
        </Container>

    );
}
    ;

    export default App;