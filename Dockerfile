FROM node
WORKDIR /app
COPY . /app
CMD npm install
CMD npm start
EXPOSE 3002
