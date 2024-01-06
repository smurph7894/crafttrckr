docker build -t crafttrckr-dev-server --no-cache server/.
docker stop crafttrckr-dev-server
docker rm crafttrckr-dev-server
docker run -d -p 8000:8000 --name crafttrckr-dev-server -e FIRST_SECRET_KEY="enter yours here" -e SECOND_SECRET_KEY="enter yours here" -e USERNAME=root -e PASSWORD=toor crafttrckr-dev-server
