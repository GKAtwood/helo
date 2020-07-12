import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';


class Nav extends Component{
    constructor(props){
        super(props)
        this.state ={
            user: {}
        }
    }


    render(){
        console.log(this.props)
        // if(this.props.location.pathname === '/'){
        //     return null
        // }else{
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


    

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Nav)