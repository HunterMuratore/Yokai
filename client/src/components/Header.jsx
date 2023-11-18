import { useMutation, gql } from '@apollo/client';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'

import { NavLink, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';

import { useStore } from '../store'

const LOGOUT_USER = gql`
    mutation {
        logout
    }
`

function Header() {
    const [ logoutUser ] = useMutation(LOGOUT_USER)
    const { user, setState } = useStore() 
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: '(max-width: 990px)' })

    const logout = async (e) => {
        e.preventDefault()

        await logoutUser()

        setState(oldState => ({
            ...oldState,
            user: null
        }))

        navigate('/')
    }

    return (
        <header>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="/">Wish List</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {user ? (
                                <>
                                    <p>Welcome, <span className="username">{user.username}</span></p>
                                    <NavLink to="/">Home</NavLink>
                                    <NavLink to="/profile">Profile</NavLink>
                                    <a href="/" onClick={logout}>Log Out</a>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/">Home</NavLink>
                                    <NavLink to="/register">Register</NavLink>
                                    {isMobile ? '' : <span>or</span>}
                                    <NavLink to="/login">Log In</NavLink>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header