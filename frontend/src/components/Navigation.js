import React from 'react';
import {useSelector} from 'react-redux';
import { Nav, NavDropdown, Navbar, Container, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap' 
import logo from "../images/logo.png"
import { useLogoutUserMutation } from '../services/appApi';
import "./Navigation.css"

function Navigation() {
  const { user } = useSelector(state => state.user)
  const [logoutUser, {isLoading}] = useLogoutUserMutation()

  function handleLogout() {
    logoutUser().then(({error}) => {
      if(!error) {
        console.log("logged out!")
      }
    })

  }
  return (
    <Navbar bg="dark" expand="lg">
    <Container>
    <LinkContainer to="/">
        <Navbar.Brand>
        <img src={logo} style={{width:60}} alt="logo"/>
        </Navbar.Brand>
      </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto text-white">
          <LinkContainer to="/">
              <Nav.Link className='text-white'>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="btn btn-primary">Login</Nav.Link>
            </LinkContainer>
            {user && (<NavDropdown title={user.email} id="basic-nav-dropdown" >
              <LinkContainer to="/new-article">
                <NavDropdown.Item>New post</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/articles/me">
                <NavDropdown.Item>My posts</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item  >
                <Button onClick={handleLogout} variant="outline-danger">Logout</Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}

        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Navigation