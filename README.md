# Execução de testes de backend
  1. Verifique se na sua máquina possui o docker instalado.
  2. Clone o projeto.
  3. Na raiz do projeto, rode o seguinte comando no terminal: 
```jsx
backend/run-tests.sh
```

# Execução de testes de frontend
  1. Verifique se na sua máquina possui o docker instalado.
  2. Clone o projeto.
  3. Na raiz do projeto, rode o seguinte comando no terminal: 
```jsx
frontend/run-tests.sh
```

# Implantação Local
  1. Verifique se na sua máquina possui o docker instalado.
  2. Clone o projeto.
  3. Na raiz do projeto, rode o seguinte comando no terminal: 
```jsx
docker-compose up --build
```
   4. Acesse no navegador a url http://localhost:5173/
   5. Teste da maneira que achar melhor :)

# Implantação Production (Heroku)
  1. Verifique se na sua máquina possui o docker instalado.
  2. Clone o projeto.
  3. Na raiz do projeto, rode os seguinte comando no terminal: 
```jsx
cp frontend/.env.example .env
```
Atualize com o valor correto a variável VITE_API_URL dentro do seu .env na pasta /frontend
  4. Na raiz do projeto, rode os seguinte comando no terminal: 
```jsx
heroku config:set MONGO_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority" --app your-app-name
```
```jsx
docker build --platform linux/amd64 -f Dockerfile.prod -t clarke-challenge .
```
```jsx
docker tag clarke-challenge registry.heroku.com/your-app-name/web
```
```jsx
docker push registry.heroku.com/your-app-name/web
```
```jsx
heroku container:release web --app your-app-name
```
   4. Acesse no navegador a url a url disponibilizado pelo heroku
   5. Teste da maneira que achar melhor :)