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
    },

    loginUser: async(req, res) => {
        //What does this function need to run properly?
        const {email, password} = req.body,
              db = req.app.get('db');

        //Checks if user is already in the database, based on email
        const foundUser = await db.users.check_user({email});
        if(!foundUser[0]){
            return res.status(400).send('Email not found');
        }

        //Compare the passwords to make they match
        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if(!authenticated){
            return res.status(401).send('Password is incorrect')
        }

        //Set user on session, send it client-side
        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },

    createPost: (req, res) => {
        const {title, image_url, content} = req.body,
        
              db = req.app.get('db');
        db.post.create_post(title, image_url, content, )
        .then(()=> { res.status(200).send({message:'Post added'})})
        .catch(err => res.status(500).send(err));
    },

    getPosts: (req, res) => {
        const dbInstance = req.app.get('db')
        const {search, user_posts} = req.query
        const newSearch = '%'+search+'%'
        const id = req.session.userid
        
        if(search && user_posts){
        dbInstance.get_posts_filtered([newSearch, id])
        .then(posts=> res.status(200).send(posts))
        .catch((err) => {
            res.status(500).send({ errorMessage: 'Something went wrong!' });
            console.log(err);
         })


    }else if(search){
        dbInstance.get_posts_search([newSearch])
        .then(posts=> res.status(200).send(posts))
        .catch((err) => {
            res.status(500).send({ errorMessage: 'Something went wrong!' });
            console.log(err);
         })

    }else if(user_posts){
        console.log(user_posts)
        dbInstance.get_posts_user([id])
        .then(posts=> res.status(200).send(posts))
        .catch((err) => {
            res.status(500).send({ errorMessage: 'Something went wrong!' });
            console.log(err);
         })
    }
    else{
        dbInstance.get_posts([])
        .then(posts=> res.status(200).send(posts))
        .catch((err) => {
            res.status(500).send({ errorMessage: 'Something went wrong!' });
            console.log(err);
         })
    }
    },
    logout: (req, res) => {
        //logout clears out the session of user data
        req.session.destroy();
        res.sendStatus(200);
    }

}