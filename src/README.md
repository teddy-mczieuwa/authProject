# Auth Project

> An authentication demo project using nuxt, express and passport.

## DATABASE user data consists of The followinig
- id : this is the normal mongodb id
- email : this is the user email
- password : this is the user's salted password
- photo : this is the user image, it is randomly generated for the 
  user, this is done by gravatar api

Authenticated user has access to any of the above properties

##API ROUTES INCLUDE:
- http://localhost:8080/auth/signup -- signup user, this registers the user in the database and generates a random token for the user
- http://localhost:8080/auth/signin -- signin user, this verifies the user's email and password and generates a random token for the user
- http://localhost:8080/auth/logout-- logout user, logs out the user
- http://localhost:8080/user -- user, if authenticated, the user details will be available.
