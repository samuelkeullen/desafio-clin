import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components';
import { Feed, CreateBlog, Login, Registro, EsqueciSenha, RecuperarSenha, About} from '../pages';
import Blog from '../pages/Blog';

import 'bootstrap/dist/css/bootstrap.min.css'

import UserProfile from '../UserProfile';

function App() {
    var userEmail = UserProfile.getEmail;
    var userName = UserProfile.getName;

    if(!userEmail) {
        return <Registro />
      } else {
          return (
            <Router>
                <div width="400px" />
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Feed} />
                    <Route path="/sobre" exact component={About}/>
                    <Route path="/criar-blog" exact component={CreateBlog} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/registro" exact component={Registro} />
                    <Route path="/esqueci-a-senha" exact component={EsqueciSenha} />
                    <Route path="/recuperar-senha" exact component={RecuperarSenha} />
                    <Route path="/blog/:blog_id" exact component={Blog} />
                </Switch>
            </Router>
          )
      }
      
}

export default App
