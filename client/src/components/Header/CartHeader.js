import React, { useState } from 'react'
import Logo from './../Logo/android-chrome-192x192.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";

export default function CartHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const Header = () => {
        if (window.location.pathname === '/cart/address') {
            return (
                <React.Fragment>
                    <NavItem>
                        <NavLink href="/cart" style={{ fontSize: "15px", color: "#f76767", fontWeight: "700" }}>BAG</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ fontSize: "15px", color: "#f76767", fontWeight: "700" }}>----</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/cart/address" style={{ fontSize: "15px", color: "#f76767", fontWeight: "700" }}>ADDRESS</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ fontSize: "15px", color: "gray", fontWeight: "700" }}>----</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/cart/order" style={{ fontSize: "15px", color: "gray", fontWeight: "700" }}>ORDER</NavLink>
                    </NavItem>
                </React.Fragment>
            )
        }
        else if (window.location.pathname === '/cart') {
            return (
                <React.Fragment>
                    <NavItem>
                        <NavLink href="/cart" style={{ fontSize: "15px", color: "#f76767", fontWeight: "700"}}>BAG</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ fontSize: "15px", color: "gray", fontWeight: "700" }}>----</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ fontSize: "15px", color: "gray", fontWeight: "700" }}>ADDRESS</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ fontSize: "15px", color: "gray", fontWeight: "700" }}>----</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/cart/order" style={{ fontSize: "15px", color: "gray", fontWeight: "700" }}>ORDER</NavLink>
                    </NavItem>
                </React.Fragment>
            )
        }
        else if (window.location.pathname === '/cart/order') {
            return (
                <React.Fragment>
                    <NavItem>
                        <NavLink style={{ fontSize: "15px", color: "#f76767", fontWeight: "700" }}>BAG</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ fontSize: "15px", color: "#f76767", fontWeight: "700" }}>----</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ fontSize: "15px", color: "#f76767", fontWeight: "700" }}>ADDRESS</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ fontSize: "15px", color: "#f76767", fontWeight: "700" }}>----</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ fontSize: "15px", color: "#f76767", fontWeight: "700" }}>ORDER</NavLink>
                    </NavItem>
                </React.Fragment>
            )
        }

    }

    return (
        <React.Fragment>
            <Navbar light expand="md" className="nav-bar123 nav-bar">
                <NavbarBrand href="/">
                    <img className="brand" src={Logo} alt="a1" />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" style={{ paddingLeft: "37%" }} navbar>
                      {Header()}
                    </Nav>
                </Collapse>
            </Navbar>
        </React.Fragment>
    )
}
