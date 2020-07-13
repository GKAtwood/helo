import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser, registerUser, getUser} from '../../ducks/reducer';

class Auth extends Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            password: ''
            
        }
    }

    handleChange(event, name) {
		const value = event.target.value;
		this.setState({ [name]: value });
    }

    createUser(){
        const newUser={
            username: this.state.username,
            password: this.state.password,
            image: `https://robohash.org/${this.state.username}`
        }
        this.props.registerUser(newUser)
        axios.post('/api/new-user', newUser).then(()=>{
            this.login()    
        })
    }

    login= () => {
        const {username, password} = this.state;
        axios.post('/api/login', {username, password})
        .then(res => {
            //set user somewhere that the app can use it (redux)
            this.props.getUser(res.data);
            //route the user away from landing, to dash
            this.props.history.push('/dashboard');
        })
        .catch(err => console.log(err));
    }
    render(){
        // console.log(this.props)
        return(
            
            <div className='Auth'>
            <div className='auth-box'>
            <img src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/helo_logo.png" alt="logo"/>
            <h1>HELO</h1>
                <div className='login'>
                Username: <input type="text" value={this.state.username} onChange={e=>this.handleChange(e,"username")} />
                </div>
                <div className='login'>
               Password: <input type="password" value= {this.state.password} onChange={e=>this.handleChange(e,"password")}/>
                </div>
                <div className='button-container'>
                    <button className='black-button' onClick={()=>this.login()}>Login</button>
                    <button className='black-button' onClick={()=> this.createUser()}>Register</button>
                </div>
                
            </div>
            </div>
        )
    }
}



export default connect(state=>state, {loginUser, registerUser, getUser} )(Auth)