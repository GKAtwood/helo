insert into users (
    username,
    password,
    profile_picture
) values (
    ${username},
    ${password},
    ${profilePicture}
)
returning id, username, profile_picture;