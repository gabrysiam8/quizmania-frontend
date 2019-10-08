import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

class MainMenu extends Component {

    render() {

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Quizmania</Navbar.Brand>
                {this.props.isAuthenticated
                    ?
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/q">Your quizzes</Nav.Link>
                    </Nav>
                    : null
                }
                <Nav className="ml-auto">
                    {this.props.isAuthenticated
                        ?
                        null
                        :
                        [
                            <Nav.Link href="/login">Login</Nav.Link>,
                            <Nav.Link href="/register">Register</Nav.Link>
                        ]
                    }
                    <NavDropdown title={<FontAwesomeIcon icon={faUser} color="white"/>} alignRight id="dropdown-menu-align-right">
                        {this.props.isAuthenticated
                            ?
                            [
                                <NavDropdown.Item href="/user/me">Profile</NavDropdown.Item>,
                                <NavDropdown.Item href="/user/me/password">Change password</NavDropdown.Item>,
                                <NavDropdown.Divider />,
                                <NavDropdown.Item onClick={this.props.onLogout}>Logout</NavDropdown.Item>
                            ]:[
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>,
                                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                            ]
                        }
                    </NavDropdown>

                </Nav>
            </Navbar>
        );
    }
}

export default MainMenu;