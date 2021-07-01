import React, { Component } from 'react';
import Like from '@material-ui/icons/ThumbUp';
import Person from '@material-ui/icons/AccountCircle';
import Send from '@material-ui/icons/Send';
import api from '../../api';
import UserProfile from '../../UserProfile';

import Comment from '../../components/Comment/index';

import "./styles.css";
class Blog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            blog_id: props.match.params.blog_id,
            blog:[],
            comments: [],
            isLoading: false,
            myComment: '',
            updateMyComment: (comment) => this.setState({ myComment: comment }),
            updateComments: (new_comments) => this.setState({comments: new_comments}),
            blogLikes: 0,
            updateLikes: (obj) => this.setState({ blog: obj }),
            user_id: localStorage.getItem("user_id"),
            author: localStorage.getItem("username")
        }
        
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await api.getBlog(this.state.blog_id).then(res => {
            this.setState({
                blog: res.data._id[0],
            })
            console.log(res.data._id[0].author)
        })
        const userEmail = UserProfile.getEmail;
        await api.getComments(this.state.blog_id).then(res => {
            this.setState({
                comments: res.data.comments,
                isLoading: false,
            })
            console.log(res.data.comments)
        });
    }

    

    render() {

        const { blog_id, user_id, myComment, author } = this.state
        const { updateLikes, updateMyComment, updateComments } = this.state

        async function handleMyCommentForm(e) {
            e.preventDefault();

            const userEmail = UserProfile.getEmail;

            if(!userEmail) {
                window.alert('Não autenticado, por favor, efetue o login!')
            }

            console.log("user_id: ".user_id)

            await api.sendComment({
                blog_id: blog_id,
                author_id: author,
                body: myComment
            }).then(res => {
                window.alert("Comentário enviado")
                updateMyComment(' ')
                api.getComments(blog_id).then(res => {
                    updateComments(res.data.comments)
                    updateMyComment(' ')
                })
            })

            
        }

        async function handleLikeTheBlog(e) {
            e.preventDefault();

            const userEmail = UserProfile.getEmail;

            if(!userEmail) {
                window.alert('Não autenticado, por favor, efetue o login!')
            }
            console.log(blog_id)
            await api.likeTheBlog(blog_id).then(res => {
                console.log('Liked')
                console.log(res.data[0])
                updateLikes(res.data[0])
            });
            
        }

        function convertDate(date) {
            const new_date = new Date(date)
            return (
                new_date.toLocaleDateString() + " | " + new_date.toLocaleTimeString()
            )
        }

        return (
            <div id="blog-page">
                <div id="top-bar">
                    <button>Blog: </button>
                </div>
                <div id="blog-container">
                    <div key={this.state.blog._id} id="blog-content">
                        <div id="blog-author">
                            <Person />
                            <p>&nbsp;{this.state.blog.author}</p>
                        </div>
                        <div id="blog-text">
                            <p><strong>{this.state.blog.title}</strong> <br /> {this.state.blog.description}</p>
                            <div id="blog-image">
                                
                                {(this.state.blog.image != "" && this.state.blog.image != "#") ? <img src={this.state.blog.image} alt="Image from the comment" /> : <span display="none" />}
                            </div>
                        </div>
                        <div id="timestamp-block">
                            <p>{convertDate(this.state.blog.date)}</p>
                        </div>
                        <div id="like-the-blog">
                            <form onSubmit={handleLikeTheBlog}>
                                <p>{this.state.blog.likes}</p>
                                <button type="submit"><Like /></button>
                            </form>
                        </div>
                    </div>
                </div>
                <div id="send-a-comment">
                    <form onSubmit={handleMyCommentForm}>
                        <textarea
                          placeholder="Que tal dar sua opnião?"
                          name="my-comment" 
                          onChange={(e) => { updateMyComment(e.target.value) }}
                        >
                            {myComment}
                        </textarea>
                        <button type="submit"><Send /></button>
                    </form>
                </div>
                <div id="comments-section">
                    <h2>Comentários</h2>

                    {
                        this.state.comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                data_key={comment._id}
                                author={comment.author_id}
                                body={comment.body}
                                date={comment.date}
                                
                            />
                        ))
                    }
                           
                </div>
            </div>
        )
    }
}

export default Blog;