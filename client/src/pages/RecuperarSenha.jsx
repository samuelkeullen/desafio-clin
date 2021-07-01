import React, { Component } from "react";

import Logo from "../logo.png";

import api from "../api/index";

import { Form, Container } from "../style/global";

import UserProfile from '../UserProfile'

import { FaLock, FaAt } from 'react-icons/fa'

import '../style/styles.css';


class RecuperarSenha extends Component {
  state = {
    email: "",
    token: "",
    password: "",
    error: ""
  };

  handleRecoverPass = async e => {

    e.preventDefault();

    const { email, token, password } = this.state;
    const payload = { email, token, password }

    if (!email || !token || !password) {
      this.setState({ error: "Preencha todos os dados para se efetuar trocar a senha!" });
    } else {
      try {
        await api.recuperarSenha(payload).then(res => {
            window.alert(`Senha trocada com sucesso!`)
            this.setState({
                email: email,
                token: token,
                password: password
            })            
        })
        this.props.history.push("/login");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro com sua troca de senha T.T" });
      }
    }
  };

  render() {
    return (
        <Container>
        <div>
        <Form onSubmit={this.handleRecoverPass}>
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
            type="text"
            placeholder="Token de recuperação"
            onChange={e => this.setState({ token: e.target.value })}
          />
          </div>
          <div>
          <FaLock size={18} className="icon" color="#77886b" />
          <input
            type="password"
            placeholder="Nova Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          </div>
          <button type="submit">Trocar senha</button>
          <hr />
        </Form>
      </div>
      </Container>
    );
  }

  //render() {
  //  return(
  //    <div id="login-page">
  //      <Form onSubmit={this.handleSignIn}>
  //          <header id="login-top">
  //              <h1>&#10077;Darksheet&#10078;</h1>
  //              <button className="signup header-signup">SignUp</button>
  //          </header>
  //          <div id="login-content">
  //              <div>
  //                  <h1>Login</h1>
  //              </div>
  //              <form>
  //               <div id="input-block">
  //                     <FaUser size={18} className="icon" color="rgb(182, 207, 214)" />
  //                    <input type="text" id="email" name="email" placeholder="E-mail"
  //                    onChange={e => this.setState({email: e.target.value})}/>
  //                  </div>
  //                  <div id="input-block">
  //                      <FaLock size={18} className="icon" color="rgb(182, 207, 214)" />
  //                      <input type="password" id="password" name="password" placeholder="Senha"
  //                      onChange={e => this.setState({password: e.target.value})}/>
  //                  </div>
  //                  <button id="btn-submit" type="submit"><FaArrowAltCircleRight size={20} color="#dad9eb" /></button>
  //              </form>
  //              <div id="links">
  //                  <a href="#">I forgot my username</a><br/>
  //                  <a href="#">I forgot my password</a>
  //              </div>
  //          </div>
  //          <footer>
  //              <h2>I don't have an account</h2>
  //              <button className="signup footer-signup">SignUp</button>
  //          </footer>
  //          </Form>
  //      </div>
  //  )
  //}
}

export default RecuperarSenha;