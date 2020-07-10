require('dotenv').config();
const express =require('express')
const massive = require('massive');
const ctrl = require('./controller');
const session = require('express-session');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
app = express();

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db=>{
    app.set('db',db);
    console.log('db connected')
});

///auth endpoints///
app.post('/api/new-user', ctrl.createUser)





app.listen(SERVER_PORT, ()=> console.log(`Doing the worm on port ${SERVER_PORT}`))
