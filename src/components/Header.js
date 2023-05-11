import React, {useState} from "react";
import {FaBars} from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import {BiExit, BiNews, BiUserCircle, BiNew } from "react-icons/bi";
import { BsNewspaper,  BsHeartFill, BsEnvelopeHeart, BsEar, BsPersonCircle, BsGear, BsBoxArrowRight} from "react-icons/bs"
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
            <nav className="navbar navbar-expand-lg fixed-top bg-success">
        <div className="container-fluid">
          <a className="navbar-brand text-bg-success" href="index.html">
            SpottedAgro
            <BsHeartFill color="white"/>
         </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-bg-success" href="index.html">
                  <BsNewspaper color="white"/>
                  Notícias
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text-bg-success" href="rec.html">
                  <BsEnvelopeHeart color="white"/>
                  Recadinho</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-bg-success" href="fof.html">
                  <BsEar color="white"/>
                  Fofoca</a>
              </li>
            </ul>
            <div className="dropdown-center" style={{marginRight: 110}}>
              <button className="btn text-bg-success" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <BsPersonCircle color="white"/> 
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">
                        <BsPersonCircle color="white"/>
                        Perfil</a></li>
                    <li><a className="dropdown-item" href="#">
                      <BsGear color="white" />
                      Configurações</a></li>
                    <li><a className="dropdown-item" href="#">
                      <BsBoxArrowRight color="white" />
                      Sair</a></li>
                  </ul>
              </button>
            </div>
          </div>
        </div>
    </nav>
        </>
    )
}
