FROM node:latest
RUN mkdir -p /opt/nodejs
WORKDIR /nodejs-blog-test
COPY . /opt/nodejs/
WORKDIR /opt/nodejs
ENV PORT=3000
ENV EXPRESS_SESSION_KEY=some_random_key
ENV MONGO=192.168.0.235
ENV DB_URI=mongodb://$MONGO/node-js-blog
RUN npm install --verbose
EXPOSE 3000
CMD ["npm", "run", "start"]