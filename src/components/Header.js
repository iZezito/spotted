import React, {useState} from "react";
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { BsNewspaper,  BsHeartFill, BsEnvelopeHeart, BsEar, BsPersonCircle, BsGear, BsBoxArrowRight} from "react-icons/bs"
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
const Header = ({logout}) =>{
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState(false);

    const handleCloseNav = () => setShowNav(false);
    const handleShowNav = () => {
        console.log('chamou!')

    }
    const handleLogout = () => {
        logout();
        navigate('/');

    }


    return (
        <>
        <Navbar bg="success" expand="lg" fixed="top">
          <Navbar.Brand className="text-bg-success">
            SpottedAgro
            <BsHeartFill color="white" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link as={Link} to="/" className="text-bg-success">
                <BsNewspaper color="white" />
                Notícias
              </Nav.Link>
              <Nav.Link as={Link} to="/" className="text-bg-success">
                <BsEnvelopeHeart color="white" />
                Recadinho
              </Nav.Link>
              <Nav.Link as={Link} to="/" className="text-bg-success">
                <BsEar color="white" />
                Fofoca
              </Nav.Link>
            </Nav>
            <Dropdown as={Nav.Item} className="dropdown-center" style={{ marginRight: 110 }}>
              <Dropdown.Toggle as={Nav.Link} id="dropdown-basic" className="text-bg-success">
                <BsPersonCircle color="white" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <BsPersonCircle color="white" />
                  <span>Perfil</span>
                </Dropdown.Item>
                <Dropdown.Item>
                  <BsGear color="white" />
                  <span>Configurações</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  <BsBoxArrowRight color="white" />
                  <span>Sair</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Navbar>
        </>
    )
}

export default Header;
