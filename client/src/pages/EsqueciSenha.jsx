import React, { Component } from "react";

import Logo from "../logo.png";

import api from "../api/index";

import { Form, Container } from "../style/global";

import UserProfile from '../UserProfile'

import { FaLock, FaAt } from 'react-icons/fa'

import '../style/styles.css';


class EsqueciSenha extends Component {
  state = {
    email: "",
    error: ""
  };

  handleForgotPass = async e => {

    e.preventDefault();

    const { email} = this.state;
    const payload = { email }

    if (!email ) {
      this.setState({ error: "Preencha todos os dados para mudar a senha!" });
    } else {
      try {
        await api.esqueciSenha(payload).then(res => {
            window.alert(`Token enviado com sucesso! Cheque sua caixa de e-mail`)
            this.setState({
                email: email
            })
        })
        this.props.history.push("/recuperar-senha");
        
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro com sua recuperação de senha T.T" });
      }
    }
  };

  render() {
    return (
        <Container>
        <div>
        <Form onSubmit={this.handleForgotPass}>
          <img src={Logo} alt="Clin logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <div>
          <FaAt size={18} className="icon" color="#77886b" />
            <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}/>
            </div>
          <button type="submit" >Enviar token</button>
          <hr />
        </Form>
      </div>
      </Container>
    );
  }
}

export default EsqueciSenha;