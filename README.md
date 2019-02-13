# node-js-shop

***basic docker commands***

docker build -t dogukan .

docker run -it -d -p 3002:3001 dogukan
docker ps
docker image ls
docker logs -f  43
docker ps
docker stop 43

docker run -it -p 3002:3001 dogukan

***basic git commands***

git init
git add .
git commit -m "initial"
git remote add origin https://github.com/dogukantizer/node-js-shop.git
git push -u origin master
