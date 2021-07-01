import React, { Component } from "react";

import api from "../api/index";

//import Blog from './FeedModel/Blog.js'

import { AboutStyle, AboutStyle2 } from "../style/global";
import { FaGithub, FaLinkedinIn, FaBriefcase } from 'react-icons/fa'

import { Link } from 'react-router-dom'


class About extends Component {

    render() {
    return (
        <AboutStyle>
            <h1>Sobre este "Blog"</h1>
            <p>Este Blog foi um desafio proposto a mim, pela Clin, pois estou disputando a vaga de Desenvolvedor Full-Stack</p>
            <p>Até o momento não encontrei dificuldades para produzir, ao longo dos dias fui capaz de produzir este blog tranquilamente.</p>
            <h2>Tempos de produção:</h2>
            <p>- Back-End: 1 dia</p>
            <p>- Front-End: 3 dias</p>
            <p>- Testes: 2 dias até o momento</p>
            <h3>Feito com carinho por:</h3>
            <p>Samuel Keullen</p>
            <AboutStyle2>
            <div id="links">
            <a style={{color:"#77886b"}} href="https://github.com/samuelkeullen"><FaGithub size={40} className="icon" color="#77886b" ></FaGithub> Meu Github</a>
            </div>
            <div id="links">
            <a style={{color:"#77886b"}} href="https://www.linkedin.com/in/samuel-keullen-passos-b43a33189/"><FaLinkedinIn size={40} className="icon" color="#77886b" ></FaLinkedinIn> Meu LinkedIn</a>
            </div>
            <div id="links">
            <a style={{color:"#77886b"}} href="https://samuelkeullen.github.io/"><FaBriefcase size={40} className="icon" color="#77886b" ></FaBriefcase> Meu portfólio</a>
            </div>
            </AboutStyle2>
       </AboutStyle>
    );
  }
}

export default About;