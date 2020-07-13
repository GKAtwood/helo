const bcrypt = require('bcryptjs');



module.exports= {
    createUser: async(req, res) => {
        console.log(req.body)
        const {username,password, profilePicture} = req.body,
              db = req.app.get('db')

       const foundUser = await db.users.check_user({username});
        if(foundUser[0]){
            return res.status(400).send('Username already in use')
        }
        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);

    
            const newUser = await db.users.register_user({username, password: hash, profilePicture});
            req.session.users = newUser[0];
            res.status(201).send(req.session.users);
    },

    loginUser: async(req, res) => {
        //What does this function need to run properly?
        const {username, password} = req.body,
              db = req.app.get('db');

        //Checks if user is already in the database, based on email
        const foundUser = await db.users.check_user({username});
        if(!foundUser[0]){
            return res.status(400).send('Username not found');
        }

        //Compare the passwords to make they match
        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if(!authenticated){
            return res.status(401).send('Password is incorrect')
        }

        //Set user on session, send it client-side
        delete foundUser[0].password;
        req.session.users = foundUser[0];
        res.status(202).send(req.session.users);
    },
 
    createPost: (req, res) => {
        const {id, postImage} = req.body,
              db = req.app.get('db');
        
        db.posts.create_post(id, postImage)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },

    getPosts: (req, res) => {
        const db = req.app.get('db')
        const {search, user_posts} = req.query
        const newSearch = '%'+search+'%'
        const id = req.session.userid
        
        if(search && user_posts){
        db.posts.get_posts_filtered([newSearch, id])
        .then(posts=> res.status(200).send(posts))
        .catch((err) => {
            res.status(500).send({ errorMessage: 'Something went wrong!' });
            console.log(err);
         })


    }else if(search){
        db.posts.get_posts_search([newSearch])
        .then(posts=> res.status(200).send(posts))
        .catch((err) => {
            res.status(500).send({ errorMessage: 'Something went wrong!' });
            console.log(err);
         })

    }else if(user_posts){
        console.log(user_posts)
        db.get_posts_user([id])
        .then(posts=> res.status(200).send(posts))
        .catch((err) => {
            res.status(500).send({ errorMessage: 'Something went wrong!' });
            console.log(err);
         })
    }
    else{
        db.posts.get_posts([])
        .then(posts=> res.status(200).send(posts))
        .catch((err) => {
            res.status(500).send({ errorMessage: 'Something went wrong!' });
            console.log(err);
         })
    }
    },

    getSinglePost: (req, res, next)=>{
        const db = req.app.get('db')
        const {id} = req.params

        db.posts.get_single_post([id]).then(post=>{
            res.status(200).send(post)
        })
        .catch((err) => {
            res.status(500).send({ errorMessage: 'Something went wrong!' });
            console.log(err);
         })
        
    },


    userInfo: (req, res, next)=>{
        const db = req.app.get('db')
        const user_id = req.session.userid

        db.users.get_user_info([id])
        .then(user=>{
            res.status(200).send(users)
        })
        .catch((err) => {
            res.status(500).send({ errorMessage: 'Something went wrong!' });
            console.log(err);
         })
    },
    logout: (req, res) => {
        //logout clears out the session of user data
        req.session.destroy();
        res.sendStatus(200);
    }

}