import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Form extends Component{
    constructor() {
		super();
		this.state = {
			title: '',
			image_url: '',
			content: ''
		};
    }
    handleChange(event, name) {
		const value = event.target.value;
		this.setState({ [name]: value });
    }
    newPost() {
		const post = {
			title: this.state.title,
			image_url: this.state.image_url,
			content: this.state.content
        };
        axios.post('/api/newpost', post).then(() => {
			this.props.history.push('/dashboard');
		});
	}



    render(){
        const imageSource =
			this.state.image_url == ''
				? 'https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png'
				: this.state.image_url;
                return (
                    <div className="form">
                        <div className="form-card">
                            <h1 className="title">New Post</h1>
                            <h3>Title:</h3>
                            <input
                                className="form-input"
                                type="text"
                                value={this.state.title}
                                onChange={(e) => this.handleChange(e, 'title')}
                            />
                            <br />
                            <img src={imageSource} alt="post-image" className="post-image" />
                            <h3>Image URL:</h3>
                            <input
                                className="form-input"
                                type="text"
                                value={this.state.image_url}
                                onChange={(e) => this.handleChange(e, 'image_url')}
                            />
                            <h3>Content:</h3>
                            <textarea
                                className="form-input"
                                value={this.state.content}
                                onChange={(e) => this.handleChange(e, 'content')}
                                cols="30"
                                rows="10"
                            />
                            <button id="post-button" className="black-button" onClick={() => this.newPost()}>
                                Post
                            </button>
                        </div>
                    </div>
                );
            }
        }

export default connect(null)(Form);