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
      // configurações de autênticação são opcionais, sendo possível seta-las na própria chamada.
      auth: {
        fields: {               
          username: 'input[name=username]',   //definindo um campo de usuário para autênticação
          password: '#teste'       // definindo um campo de senha para autênticação 
        }
      }
  });
```
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
