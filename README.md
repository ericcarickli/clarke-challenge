# Implantação Local
  1. Verifique se na sua máquina possui o docker instalado.
  2. Clone o projeto.
  3. Na raiz do projeto, rode o seguinte comando no terminal: 
```jsx
docker-compose up --build
```
   4. Acesse no navegador a url http://localhost:5173/
   5. Teste da maneira que achar melhor :)

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

// ou

cd frontend && npm test
```