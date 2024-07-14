import React from "react";
// import Logo from './Logo.png'

import "./styles.css";
import { Navbar, Nav } from "react-bootstrap";
import "./Home.css";
import Logout from "../../Screens/Logout/Logout";

export default function Home() {
  return (
    <>
      <div>
        <div>
          <Navbar className="nnnx" collapseOnSelect expand="lg">
            {/* <Nav.Item>
                            <div className='logo'>
                                <img src={Logo}  alt="Logo"/>
                            </div>
                        </Nav.Item> */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="right" variant="pills" defaultActiveKey="/home">
                <Nav className="mr-auto items-list">
                  {/* <Nav.Item className='list-item'>
                            <Nav.Link eventKey="link-1" href="/dashboard"><div className='item-name'>Dashboard</div></Nav.Link>
                        </Nav.Item> */}
                  {/* <Nav.Item className='list-item'>
                            <Nav.Link eventKey="link-5" href="/sell"><div className='item-name'>Add Medicine</div></Nav.Link>
                        </Nav.Item> */}
                  {/* <Nav.Item className='list-item'>
                            <Nav.Link eventKey="link-2" href="/products"><div className='item-name'>Products</div></Nav.Link>
                        </Nav.Item> */}
                  {/* <Nav.Item className='list-item'>
                            <Nav.Link eventKey="link-4" href="/blogall"><div className='item-name'>Blog</div></Nav.Link>
                        </Nav.Item> */}
                </Nav>
              </Nav>
            </Navbar.Collapse>
            {/* <Logout /> */}
          </Navbar>
        </div>
      </div>
    </>
  );
}

// export default Home;
