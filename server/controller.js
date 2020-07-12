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
    createPost: (req, res) => {
        const {title, image_url, content} = req.body,
        const user_id = req.session.userid
              db = req.app.get('db');
        
        db.post.create_post(title, image_url, content, user_id)
        .then(()=> { res.status(200).send({message: 'Post added'})})
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
    }
}