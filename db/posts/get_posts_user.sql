select * from posts 
INNER JOIN users on posts.user_id  = users.id
Where user_id <> $1;