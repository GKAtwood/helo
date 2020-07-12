select * from posts 
INNER JOIN users on posts.user_id  =users.id 
Where title LIKE $1 and user_id <> $2