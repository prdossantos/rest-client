# REST Client
Cliente JavaScript para API RESTful

## Instalação
> Testes
```sh
  npm install --dev
```

## Testes
```sh
  gulp
```
## Exemplos
######Configuração
```javascript
  RC({
      host: '/testes/jwt/examples/api',   // definindo um host 
  });
```
######Método GET
```javascript
  //Quando carregar página
  RC().get('/',function(res,status,statusText){
    console.log(res)
  });
  
  //Quando clicar em um elemento. Passando como parametro os elementos de um formulário
  RC('button','click').get('/users','form#get',function(res,status,statusText){
    // codigo
  })
```
######Método POST
```javascript
  //Passando campos dinamicos, atravéz de tags, ids e classes
  RC('#submit','click').post('/users',{title:'form#title',description:'form#description'},function(res,status,statusText){
    console.log(res)
  });
  //Passando todos os campos de um formulário
  RC('#submit','click').post('/users','form#test',function(res,status,statusText){
    console.log(res)
  });
```