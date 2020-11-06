docker container run -it mongo /bin/bash
docker container run -d mongo

docker run -d -p 27017:27017 --name mongodb mongo