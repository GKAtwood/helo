insert into users (
    username,
    password,
    profile_picture
) values (
    ${username},
    ${password},
    ${profilePicture}
)
returning user_id, username, profile_picture;