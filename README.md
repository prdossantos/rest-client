# REST Client
Cliente JavaScript para API RESTful

## Instalação
> Testes
```sh
  npm install --dev
```
## Exemplos
###### Configuração
```javascript
  RC().setConfig({
      host: 'http://domain.com',   // definindo um host 
  });
```
###### Método GET
```javascript
  //Quando carregar página
  RC().get('/auth',function(res,status,statusText){
    let obj = JSON.parse(res)
    //Setando uma nova configuração e gravando localmente.
    // Para não gravar, passe o terceiro parametro como false.
    RC().setConfig('header',{Authorization: obj.token},true)
  });
  //Quando clicar em um elemento. Passando como parametro os elementos de um formulário
  RC('button','click').get('/users','form#get',function(res,status,statusText){
    // codigo
  })
  //Quando clicar em um elemento. Passando como parametro um elemento específico
  RC('button','click').get('/users',{username:'form#get input[name="campo dinâmico"]',codigo:'meu codigo estático'},function(res,status,statusText){
    // codigo
  })
```
###### Método POST
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
## Testes
```sh
  gulp
```
