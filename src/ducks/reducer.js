const initialState = {
    username: null,
    password: null,
    image: null,
   
}

const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'
const GET_INFO = 'GET_INFO'
const LOGOUT = "LOGOUT"

export function loginUser(user){
    return{
        type:LOGIN,
        payload: user
    }
}
export function registerUser(user){
    return{
        type: REGISTER,
        payload: user
    }
}
export function getUser(user){
    return{
        type: GET_INFO,
        payload: user
    }
}
export function logOut(){
    return{
        type: LOGOUT,
        payload: initialState
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case LOGIN:
            return {...state, username: action.payload.username, id: action.payload.id, image: action.payload.image}

        case REGISTER:
            return {...state, username: action.payload.username, id: action.payload.id, image: action.payload.image}
        
        case GET_INFO:
            return {...state, username: action.payload.username, image:action.payload.profile_picture}

        case LOGOUT:
            return {...state, username: action.payload.username, id: action.payload.id, image: action.payload.image}
        default: 
            return state;
    }
}