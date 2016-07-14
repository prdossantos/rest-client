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
######Método GET
```javascript
  //Quando carregar página
  RC().get('/',function(res,status,statusText){
    console.log(res)
  });
  
  //Quando clicar em um elemento, passando como parametro os elementos de um formulário
  RC('button','click').get('/users','form#get',function(res,status,statusText){
    // codigo
  })
```
