# Implantação
  1. Verifique se na sua máquina possui o docker instalado.
  2. Clone o projeto.
  3. Na raiz do projeto, rode o seguinte comando no terminal: 
```jsx
docker-compose up --build
```
   4. Acesse no navegador a url http://localhost:5173/
   5. Teste da maneira que achar melhor :)



// brew services start mongodb-community

docker build --platform linux/amd64 -f Dockerfile.prod -t clarke-challenge .

docker tag clarke-challenge registry.heroku.com/clarke-app/web

docker push registry.heroku.com/clarke-app/web

heroku container:release web --app clarke-app

heroku stack --app clarke-app

heroku logs --tail 
heroku restart --app clarke-app    

heroku run bash --app clarke-app

// 01g72Obl59zQDifu

mongodb+srv://clarke:01g72Obl59zQDifu@cluster0.hnafyzm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

heroku config:set MONGO_URI="mongodb+srv://clarke:01g72Obl59zQDifu@cluster0.hnafyzm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" --app clarke-app

heroku config:set VITE_API_URL="https://clarke-app-28da62c373b8.herokuapp.com" --app clarke-app      

VITE_API_URL=https://clarke-app-28da62c373b8.herokuapp.com