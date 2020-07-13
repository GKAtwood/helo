import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux'

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			posts: [],
			user_posts: false
		};
    }
    componentDidMount() {
		axios.get(`/api/posts?search=&user_posts=`).then((response) => {
			this.setState({ posts: response.data });
		});
    }
    handleChange(string) {
		this.setState({ search: string });
    }
    filterPosts() {
		if (this.state.user_posts) {
			axios.get(`/api/posts?search=${this.state.search}&user_posts=${this.state.user_posts}`).then((response) => {
				this.setState({ posts: response.data });
			});
		} else {
			axios.get(`/api/posts?search=${this.state.search}&user_posts=`).then((response) => {
				this.setState({ posts: response.data });
			});
		}
    }
    hideUserPosts() {
		if (this.state.user_posts) {
			this.setState({ user_posts: false });
		} else {
			this.setState({ user_posts: true });
		}
    }
    resetSearch() {
		if (this.state.user_posts) {
			this.setState({ search: '' });
			axios.get(`/api/posts?search=&user_posts=${this.props.id}`).then((response) => {
				this.setState({ posts: response.data });
			});
		} else {
			this.setState({ search: '' });
			axios.get(`/api/posts?search=&user_posts=`).then((response) => {
				this.setState({ posts: response.data });
			});
		}
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
export default connect(null)(Dashboard);