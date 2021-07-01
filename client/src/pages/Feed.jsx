
import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Header from './FeedModel/Header';
import FeaturedPost from './FeedModel/FeaturedPost';
import Footer from './FeedModel/Footer';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs:[],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getFeed().then(res => {
            this.setState({
                blogs: res.data.blogs,
                isLoading: false,
            })
        })
    } 


    render() {
        const { blogs, isLoading } = this.state
        const useStyles = makeStyles((theme) => ({
          mainGrid: {
            marginTop: theme.spacing(3),
          },
        }));
        
        const featuredPosts = blogs;

        return (
          <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Header title="Feed"/>
            <main>
              <Grid container spacing={4}>
                {featuredPosts.map((post) => (
                  <FeaturedPost key={post.title} post={post} />
                ))}
              </Grid>
            </main>
          </Container>
          <Footer title="Clin, com você sempre que precisar!" />
        </React.Fragment>
        )
    }
}

export default Feed