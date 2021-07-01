import React, { Component } from "react";

import Logo from "../logo.png";

import api from "../api/index";

import { Form, Container } from "../style/global";

import UserProfile from '../UserProfile'

import { FaUser, FaLock, FaAt } from 'react-icons/fa'

class Registro extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {

    e.preventDefault();

    const { email, name, password } = this.state;
    const payload = { email, name, password }

    if (!name || !email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar!" });
    } else {
      try {
        await api.registro(payload).then(res => {
            window.alert(`Registrado com sucesso!`)
            this.setState({
                email: email,
                name: name,
                password: password
            })
        }) 
        this.props.history.push("/login");
        UserProfile.setName(name);

      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro com seu Registro T.T" });
      }
    }
  };

  render() {
    return (
      <Container>
        <div>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Clin logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <div>
          <FaAt size={18} className="icon" color="#77886b" />
            <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}/>
            </div>
            <div>
            <FaUser size={18} className="icon" color="#77886b"/>
            <input
            type="text"
            placeholder="Nome de usuário"
            onChange={e => this.setState({ name: e.target.value})}/>
          </div>
          <div>
          <FaLock size={18} className="icon" color="#77886b" />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          </div>
          <button type="submit">Registrar</button>
          <hr />
        </Form>
      </div>
      </Container>
    );
  }
}

export default Registro;