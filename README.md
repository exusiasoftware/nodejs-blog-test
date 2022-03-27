Run Mongo DB
```
docker run -d -p 27017:27017 --name mongodb mongo:4.4.10-rc0
```
Build the Docker image
```
docker build . -t nodejs-blog-test:1
```
Create the Docker container 
```
docker run -d -p 3000:3000 --name nodejs-blog-test-build-1  nodejs-blog-test:1
```
Get the Docker container logs
```
docker logs  nodejs-blog-test-build-1
```
Stop the Docker container 
```
docker stop nodejs-blog-test-build-1
```
Remove the Docker container
```
docker rm nodejs-blog-test-build-1
```
Delete Docker image
```
docker rmi nodejs-blog-test:1
```




