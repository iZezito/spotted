import React from "react";
import Container from 'react-bootstrap/Container';
import "./App.css";
import Main from "./screens/Main";
import NotFoundPage from "./screens/NotFoundPage";
import Header from "./components/Header";
import {Routes, Route} from "react-router-dom";
import GPTValidation from "./screens/GPTValidation";
const App = () => {


    return (
        <Container fluid="auto">
        
            <Header/>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/recados" element={<GPTValidation/>}/>
                <Route exact path={"*"} element={<NotFoundPage/>}/>
            </Routes>
        </Container>

    );
}
    ;

    export default App;