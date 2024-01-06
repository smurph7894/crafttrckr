# CraftTrckr

CraftTrckr is a website idea for taking steps of projects/hobbies one is currently working on. Future additions will allow for users to view each others projects, search by key words, and message each other.

## Deployed Website
http://34.220.179.145/

## Getting Started

### Add an .env file.

* To run this code locally you'll need to add a .env file with your own secret keys added
    FIRST_SECRET_KEY="enter yours here"
    SECOND_SECRET_KEY="enter yours here"

### Images

Please note that in the deployed version the image upload currently uses the image url and the file loader is commented out. The file option is saved on the web server and does not work when deployed. Ideally in future I'd use S3 or another equivlient to make the image file upload work in a deployed environment. 

If on localhost and you'd like the images to be saved as files, uncomment the noted sections in:

DisplayProject
ProjectEditor
ProjectIcon


### Purpose
* To be a location people can save their own projects craft or otherwise with instructions, image, etc for tracking of progress or to share with others. Future versions could include a discussion board, project tag search, project commenting, and project liking. 

### Functionality
Basic CRUD functions (user and project) - see server folder, routes and controller files.

### Dependencies
React
express
bootstrap
draft-js

### To Run Locally

Pull repository to VS Code

Create a mongo database and make sure line 6 in moongoose.config file the address matches your personal database location. 

Open VS Code window for CRAFTTRCKR/server
    - open terminal
    - type "nodemon serer.js" 
    - enter

open another VS Code window for CRAFTTRCKR/client
    - open another terminal
    - type npm i
    - enter
    - add .env file noted above and save
    - type npm start
    - enter

Project should open up and run in your browser on local host. 




docker run -d -p 27017:27017 --name mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=toor mongo

docker run -d -p 8000:8000 --name express-app -e FIRST_SECRET_KEY="enter yours here" -e SECOND_SECRET_KEY="enter yours here" -e USERNAME=root -e PASSWORD=toor my-express-app

docker run -d -p 3000:3000 --name react-app my-react-app

docker run -d -p 8080:8080 --name nginx-app my-nginx-app

docker build -t my-express-app .
docker build -t my-react-app .
docker build -t my-nginx-app .
