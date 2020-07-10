import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'

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

    
    render(){
        return(

        <div>Auth
            <form>
                <label> 
                            
                    <input type="text" placeholder="Username" />
                </label>
                     <input type="text" placeholder="Password" />
                     <button>Login</button>
                     <button>Register</button>
            </form>


             
        </div>
        )
    }
}

export default Auth