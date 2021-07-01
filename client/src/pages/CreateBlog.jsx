import React, { Component } from "react";

import Logo from "../logo.png";

import api from "../api/index";

import { Form, Container } from "../style/global";

import UserProfile from '../UserProfile'

import { FaBook, FaUser, FaItalic } from 'react-icons/fa'
//FaBook

class CreateBlog extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    author: ""
};


  handleBlog = async e => {

    const userEmail = UserProfile.getEmail;

    if(!userEmail) {
        //return <Registro />
        window.alert('Não autenticado, por favor, efetue o login!')
    }

    e.preventDefault();

    
    const { title, description, image, author} = this.state;
    const payload = { title, description, image, author}
    
    //this.state.user = userEmail;

    if ( !title || !description || !author || !image ) {
      this.setState({ error: "Preencha todos os dados para postar o blog!" });
    } else {
      try {
        await api.criarBlog(payload).then(res => {
            window.alert(`Blog criado com sucesso`)
            this.setState({
                title: title,
                description: description,
                image: image,
                author: author
            })
        }) 
        
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro com seu Post T.T" });
      }
    }
  };

  render() {
    return (
        <Container>
        <Form onSubmit={this.handleBlog}>
          <img src={Logo} alt="Clin logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <div>
          <FaBook size={18} className="icon" color="#77886b" />
          <input
            type="text"
            placeholder="Título do Blog"
            onChange={e => this.setState({ title: e.target.value })}
          />
          </div>
          <div>
          <FaItalic size={18} className="icon" color="#77886b" />
          <input
            type="text"
            placeholder="Conteúdo do Blog"
            onChange={e => this.setState({ description: e.target.value })}
          />
          </div>
          <div>
          <FaBook size={18} className="icon" color="#77886b" />
          <input
            type="text"
            placeholder="URL da imagem"
            onChange={e => this.setState({ image: e.target.value })}
          />
          </div>
          <div>
          <FaUser size={18} className="icon" color="#77886b" />
          <input
            type="text"
            placeholder="Autor do Blog"
            onChange={e => this.setState({ author: e.target.value })}
          />
          </div>
          <button type="submit">Criar Blog</button>
          <hr />
          </Form>
      </Container>
        //<FaAt size={18} className="icon" color="#77886b" />
        //<input
        //type="email"
        //placeholder="Endereço de e-mail"
        //onChange={e => this.setState({ email: e.target.value })}/>
        //</div>

    );
  }
}

export default CreateBlog;