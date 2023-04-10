import React, {useState} from "react";
import {FaBars} from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import {BiExit, BiNews, BiUserCircle} from "react-icons/bi";
import {GiAcousticMegaphone, GiLoveLetter} from "react-icons/gi";
import {Link} from "react-router-dom";

export default function Header(){

    const [showNav, setShowNav] = useState(false);

    const handleCloseNav = () => setShowNav(false);
    const handleShowNav = () => {
        console.log('chamou!')
        setShowNav(true);
    }


    return (
        <>
            <div className="topButton">
                <FaBars color="white" className="ms-2 mt-2" onClick={handleShowNav} size={35}/>
                <h1 className="text-light mt-3 mx-auto">Spotted</h1>
            </div>
            <Offcanvas show={showNav} onHide={handleCloseNav} className="bg-dark">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="text-light">Spotted</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Link to={'/perfil'} className={'nav-link'}><BiUserCircle size={30}/>Perfil</Link>
                        <Link to={'/'} className={'nav-link'}><BiNews size={30}/>Feed de noticias</Link>
                        <Link to={'/recados'} className={'nav-link'}><GiLoveLetter size={30}/>Deixar recadinho</Link>
                        <Link to={'/fofoca'} className={'nav-link'}><GiAcousticMegaphone size={30}/>Fofocar</Link>
                        <Link to={'/sair'} className={'nav-link'}><BiExit size={30}/>Sair</Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
            <div className="container-nav">

                <Nav defaultActiveKey="/" className="flex-column">
                    <Link to={'/perfil'} className={'nav-link'}><BiUserCircle size={30}/>Perfil</Link>
                    <Link to={'/'} className={'nav-link'}><BiNews size={30}/>Feed de noticias</Link>
                    <Link to={'/recados'} className={'nav-link'}><GiLoveLetter size={30}/>Deixar recadinho</Link>
                    <Link to={'/fofoca'} className={'nav-link'}><GiAcousticMegaphone size={30}/>Fofocar</Link>
                    <Link to={'/sair'} className={'nav-link'}><BiExit size={30}/>Sair</Link>
                </Nav>

            </div>
        </>
    )
}
