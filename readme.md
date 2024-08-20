ALtSchool Africa - Web Development Training (NodeJS)

## Table of contents

- [Overview](#overview)
- [Built with](#built-with)
- [Links](#links)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

Scissor is a sleek and efficient URL shortening application that allows users to shorten long URLs into custom, manageable short links. It includes user authentication and personalized link management, enabling users to track the performance of their links with click analytics. The app offers a clean and user-friendly interface, making link sharing simple and effective.

**Features**

_User Authentication:_

1. Users can sign up and log in to manage their links.
2. Secure password management using bcrypt.
3. Session management using Passport.js.

_URL Shortening:_

1. Users can shorten URLs to custom or automatically generated short links.
2. Short links are unique and can be easily shared.

_Link Management:_

1. Users can view, copy, and delete their shortened URLs.
2. Click tracking for each shortened URL.

   _QR Code Generation:_

3. Users can generate a QR code for each shortened URL.
4. QR codes can be scanned to access the shortened URL directly.

   _Caching with Redis:_

5. Redis is used to cache URL redirection data, improving performance by reducing database load.
6. Implemented cache strategies ensure efficient data retrieval and handle cache invalidation.

## Built with

-Node.js
-Express.js
-MongoDB
-Mongoose
-EJS
-Bootstrap
-Passport.js
-bcrypt.js
-nanoid
-Redis

## Links

- Live Site URL: [live site URL here](https://scissor-app-rdu6.onrender.com/)

## Author

- Github Profile - [@alfarukky](https://github.com/alfarukky)

## Acknowledgments

I express my sincere gratitude to our mentors _@altschoolafrica_
