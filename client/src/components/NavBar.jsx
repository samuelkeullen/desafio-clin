import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'

const Container = styled.div.attrs({
    className: 'container'
})`
background-color: #ffffff;
color: #77886b;
width: 100%
`

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg',
    color: '#77886b'
})
`
color: #77886b;
`

//const Navv = styled.nav
//`
//background-color: #000000;
//width: 1000px;
//height: 50px`

class NavBar extends Component {
    render() {
        return (
            <Container>

                <Nav>
                    <Logo />
                    <Links />
                </Nav>
            </Container>
        )
    }
}

export default NavBar