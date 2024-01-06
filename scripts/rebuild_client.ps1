docker build -t crafttrckr-dev-ui --no-cache client/.
docker stop crafttrckr-dev-ui
docker rm crafttrckr-dev-ui
docker run -d -p 3000:80 --name crafttrckr-dev-ui crafttrckr-dev-ui