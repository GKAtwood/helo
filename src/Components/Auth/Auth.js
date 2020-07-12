import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser, registerUser} from '../../ducks/reducer';

class Auth extends Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            password: ''
        }
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

    login(){
        const user = {
            username: this.state.username,
            password: this.state.password
        }
       
        axios.post('/api/login', user).then(results=>{
            console.log(results)
            this.props.loginUser(results.data[0]);
            this.props.history.push('./dashboard')
        })
    }


    render(){
        
        return(
            <div className='Auth'>
            <div className='auth-box'>
            <img src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/helo_logo.png" alt="logo"/>
                <h1>HELO</h1>
                <div className='login'>
                Username: <input type="text"/>
                </div>
                <div className='login'>
               Password: <input type="password"/>
                </div>
                <div className='button-container'>
                    <button className='black-button'>Login</button>
                    <button className='black-button'>Register</button>
                </div>
                
            </div>
            </div>
        )
    }
}

export default connect(null, {loginUser, registerUser})(Auth);