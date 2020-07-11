import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			posts: [],
			user_posts: false
		};
	}


    render() {
		const posts = this.state.posts.map((post, index) => {
			return (
				<Link key={index} to={`post/${post.post_id}`}>
					<div className="post_summary">
						<h3>{post.title}</h3>
						<div className="post-user">
							<p>by {post.username}</p>
							<img src={post.profile_picture} alt="Profile" className="profile-thumbnail" />
						</div>
					</div>
				</Link>
			);
		});

		return (
			<div className="dashboard">
				<div className="dashboard-search">
					<div>
						<input
							className="search-bar"
							type="text"
							placeholder="Search by Title"
							value={this.state.search}
							onChange={(e) => this.handleChange(e.target.value)}
						/>
						<button className="black-button" onClick={() => this.filterPosts()}>
							search
						</button>
						<button className="black-button" onClick={() => this.resetSearch()}>
							Reset
						</button>
					</div>
					<div>
						Hide My Posts{' '}
						<input
							className="checkbox"
							type="checkbox"
							onChange={() => this.hideUserPosts()}
							value={this.state.user_posts}
						/>
					</div>
				</div>
				<div className="posts-box">{posts}</div>
			</div>
		);
	}
}
export default Dashboard