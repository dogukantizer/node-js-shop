# node-js-shop

***node installations***

yükleme: npm install --save express

server başlatma: node server.js

server durdurma: cntrl+c

otomatik server: npm install --save-dev nodemon

otomatik server başlatma: npm start

log + error handling: npm install --save morgan

body parser: npm install --save body-parser

mongo db kurulum: npm install --save mongoose

image yüklemekte icin: pm install -save multer

node.bcyrpt.js: npm install bcrypt

https://github.com/auth0/node-jsonwebtoken
npm install jsonwebtoken -save

https://jwt.io/

https://www.youtube.com/watch?v=ucuNgSOFDZ0&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=14

visual studio code + postman

postgreSql : npm install --save pg

***basic docker commands***

docker build -t dogukan .

docker run -it -d -p 3002:3001 dogukan

docker ps

docker image ls

docker logs -f  43

docker ps

docker stop 43

docker run -it -p 3002:3001 dogukan

silme : docker rm -f $(docker ps -aq)

image silme : docker image rm -f $(docker image ls -aq)

***basic git commands***

git init

git add .

git commit -m "initial"

git remote add origin https://github.com/dogukantizer/node-js-shop.git

git push -u origin master


***docker cloud***

https://www.youtube.com/watch?v=F82K07NmRpk&list=PLlj9BrHKq9WKaz8UV3BjEqicn-C3qHxy4&index=9&t=0s

***redis installation***

https://www.youtube.com/watch?v=JGvbEk4jtrU

***elastic kibana***

https://www.youtube.com/watch?v=vk9oW1qNRb4

kibana : http://localhost:5601

pino : npm install pino

pino : npm install pino-socket

pino-socker : npm install --production -g pino-socket