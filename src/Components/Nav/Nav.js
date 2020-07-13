import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {getUser, logOut} from '../../ducks/reducer'
import axios from 'axios';


class Nav extends Component{
    constructor(props){
        super(props)
        this.state ={
            user: {}
        }
    }
    componentDidMount(){
        if(this.props.location.pathname !== '/'){
        axios.get('/api/auth/me').then(response=>{
            this.props.getUser(response.data[0])
        })
        }
    }

    logOut(){
        axios.post('/api/auth/logout').then(()=>{
            this.props.logOut()
        })
    }




    render(){
        console.log(this.props)
        if(this.props.location.pathname === '/'){
            return null
        }else{
        return(
             <div className='nav-bar'>
                <div className='nav-bar-top'>
                <img src={this.props.image} alt='Missing' className='nav-profile-picture'/>
            <p>{this.props.username}</p>
               <Link to= '/dashboard'> <img className='nav-bar-icon' src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/home_logo.png" alt="home"/>
            </Link>
            <Link to= '/new'>
            <img className='nav-bar-icon' src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/new_logo.png" alt="create-post"/>
            </Link>
           
            </div>
            <Link to='/'>
            <img className='nav-bar-icon' src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/shut_down.png" alt="log-out"/>
            </Link>
            </div>
            )
        }
    }
}



    

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser, logOut})(Nav)