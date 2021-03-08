FROM node:latest
RUN mkdir -p /opt/nodejs
RUN git clone https://github.com/exusiasoftware/nodejs-blog-test.git
WORKDIR /nodejs-blog-test
COPY . /opt/nodejs/
WORKDIR /opt/nodejs
ENV PORT=3000
ENV EXPRESS_SESSION_KEY=some_random_key
ENV MONGO=192.168.0.11
ENV DB_URI=mongodb://$MONGO/node-js-blog
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]
