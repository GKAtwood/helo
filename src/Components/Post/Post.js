import React, {Component} from 'react';
import axios from 'axios';


class Post extends Component {
	constructor(props) {
		super();
		this.state = {
			post: {}
		};
	}
	componentWillMount() {
		axios.get(`/api/post/${this.props.match.params.postid}`).then((response) => {
			this.setState({ post: response.data[0] });
		});
	}



    render() {
		return (
			<div className="post">
			<div className="post-card">
					<div className="title-author">
						<h1 className="title">{this.state.post.title}</h1>
						<div className="post-user">
							<p>by {this.state.post.username}</p>
							<img
								src={this.state.post.profile_picture}
								alt="profile-image"
								className="profile-thumbnail"
							/>
						</div>
					</div>
					<div className="post-content">
						<img src={this.state.post.image_url} alt="post-image" className="post-image" />
						<p className="content-container">{this.state.post.content}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Post