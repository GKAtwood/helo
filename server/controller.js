const bcrypt = require('bcryptjs');

module.exports={
    createUser: async(req, res) => {
        //What does the function need to run properly?
        const {username, password, profilePicture} = req.body,
              db = req.app.get('db');

        //Does a user with this email already exist?
        const foundUser = await db.users.check_user({email});
        if(foundUser[0]){
            return res.status(400).send('Email already in use')
        }

        //Hashing the users password
        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);

        //Registering the user, and sending the session client-side
        const newUser = await db.users.register_user({username, password: hash, profilePicture});
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    }
}