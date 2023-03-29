import React, {useState} from "react";
import {FaBars} from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import {BiExit, BiNews, BiUserCircle} from "react-icons/bi";
import {GiAcousticMegaphone, GiLoveLetter} from "react-icons/gi";

export default function Header(){

    const [showNav, setShowNav] = useState(false);

    const handleCloseNav = () => setShowNav(false);
    const handleShowNav = () => {
        console.log('chamou!')
        setShowNav(true);
    }


    return (
        <>
            <FaBars color="white" className="topButton ms-4 mt-3" onClick={handleShowNav} size={35}/>
            <Offcanvas show={showNav} onHide={handleCloseNav} className="bg-dark">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="text-light">Spotted</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link eventKey="link-4"><BiUserCircle size={30}/>Perfil</Nav.Link>
                        <Nav.Link href="/home"><BiNews size={30}/>Feed de noticias</Nav.Link>
                        <Nav.Link eventKey="link-1"><GiLoveLetter size={30}/>Deixar recadinho</Nav.Link>
                        <Nav.Link eventKey="link-2"><GiAcousticMegaphone size={30}/>Fofocar</Nav.Link>
                        <Nav.Link eventKey="link-3"><BiExit size={30}/>Sair</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
            <div className="container-nav">

                <Nav defaultActiveKey="/" className="flex-column">
                    <Nav.Link eventKey="link-4"><BiUserCircle size={30}/>Perfil</Nav.Link>
                    <Nav.Link href="/"><BiNews size={30}/>Feed de noticias</Nav.Link>
                    <Nav.Link href="/recados"><GiLoveLetter size={30}/>Deixar recadinho</Nav.Link>
                    <Nav.Link eventKey="link-2"><GiAcousticMegaphone size={30}/>Fofocar</Nav.Link>
                    <Nav.Link eventKey="link-3"><BiExit size={30}/>Sair</Nav.Link>
                </Nav>

            </div>
        </>
    )
}
