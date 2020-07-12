select * from posts 
INNER JOIN users on posts.user_id  =nusers.id 
WHERE post_id =$1;