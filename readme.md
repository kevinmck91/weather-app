Start the server using ' node src/app.js'

Express is a minimalistic 'bare bones' web framework built for Node JS.
The query string is taken by express

Handlebars.js is a logicless templating language that keep the view and the code separated like we all know they should be.

Define which handlesbars file are inlcuded in the project when the project is run on the terminal using nodemon
-e Stands for extensions list
nodemon src/app.js -e js,hbs

In case the server crashes when accessing external URLs and they connect sucesfully but return no data, we set up default parameters (the crash comes from destructuring data that doesnt exist) 
= {}  This is how you set default parameters


"Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
Means you have response.send or respond.send twice in the code where you should only have it once
Add the "Return" to the first res.send as the following code wont send.

There are two app.js files. The server side app.js and the client side app.js