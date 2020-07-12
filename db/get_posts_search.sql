select * from posts 
INNER JOIN users on posts.user_id  =users.id 
Where title ILIKE $1;