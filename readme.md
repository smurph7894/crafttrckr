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

* Please note that in the deployed version the image upload currently uses the image url and the file loader is commented out. The file option is saved on the web server and does not work when deployed. Ideally in future I'd use S3 or another equivlient to make the image file upload work in a deployed environment. 

If on localhost and you'd like the images to be saved as files, uncomment the noted sections in:

DisplayProject
ProjectEditor
ProjectIcon
