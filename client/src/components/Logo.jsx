import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../logo.jfif'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="https://sambarros.com">
                <img src={logo} width="100" height="100" alt="sambarros.com" />
            </Wrapper>
        )
    }
}

export default Logo