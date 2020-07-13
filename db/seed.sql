CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(20),
password text,
profile_picture TEXT
);

CREATE TABLE posts (
id SERIAL PRIMARY KEY,
title varchar(45),
image_url TEXT,
content TEXT,
author_id int references users(id)
);