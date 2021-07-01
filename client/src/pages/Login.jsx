import React, { Component } from "react";

import Logo from "../logo.png";

import api from "../api/index";

import { Form, Container } from "../style/global";

import UserProfile from '../UserProfile'

import { FaLock, FaAt } from 'react-icons/fa'

import '../style/styles.css';
class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleLogin = async e => {

    e.preventDefault();

    const { email, password } = this.state;
    const payload = { email, password }

    if (!email || !password) {
      this.setState({ error: "Preencha todos os dados para se efetuar o login!" });
    } else {
      try {
        await api.login(payload).then(res => {
            window.alert(`Logado com sucesso`)
            this.setState({
                email: email,
                password: password
            })
            UserProfile.setEmail(email);
            localStorage.setItem('user_id', res.data.username._id)
            localStorage.setItem('username', res.data.username.name)
        })  
        this.props.history.push("/");

      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro com seu Login T.T" });
      }
    }
  };

  render() {
    return (
        <Container>
        <Form onSubmit={this.handleLogin}>
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
          <FaLock size={18} className="icon" color="#77886b" />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          </div>
          <button type="submit">Efetuar Login</button>
          <div id="links">
            <a style={{color:"#77886b"}} href="http://localhost:8000/esqueci-a-senha">Esqueci minha senha</a>
          </div>
          <hr />
        </Form>
      </Container>
    );
  }

}

export default Login;