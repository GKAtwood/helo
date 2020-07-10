import React from 'react'
import {Route} from 'react-router-dom'
import {Switch} from 'react-router-dom'
import Form from './Components/Form/Form'
import Post from './Components/Post/Post'
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'

export default function Routes(){
    return (
        <Switch>
            <Route exact path= "/" component= {Auth}/>
            <Route path ="/dashboard" component= {Dashboard} />
            <Route path = "/post/:postid" component={Post}/>
            <Route path= '/new' component={Form}/>
        </Switch>
    )
}