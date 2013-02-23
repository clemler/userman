% UserMgmt Sample node.js application
% Chris Lemler
% February 21, 2013

# Overview
This application demonstrates the use of a Bootstrap popover in conjunction with
Backbone.js models and views. You must have node.js installed on your system in
order to run the application.

# Running the Application
* cd to the userman directory
* execute `npm -install`
* execute `node server.js`
* this will start the server on port 3000
* launch a browser at http://localhost:3000

# Code Structure
* public/ - contains the static resources served by the server for use in
  the client
* public/js/usermgmt.js - the primary web client javascript module
    * Contains example usage of Backbone.js views/models, and Bootstrap popovers
* server.js - the node.js server
* views/ - contains the jade templates used to render the application page
    * Hint: #foo.bar is translated to `<div id="foo" class="bar">` by Jade
* views/index.jade - the overall page structure and templates
* routes/users.js - Express module that handles the routes defined in server.js

# TODO
* Foo
