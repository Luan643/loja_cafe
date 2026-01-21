
# Coffee Shop

<img heigth="200px" width="200px" src="./latte-art.png" /> 

## Descrição
Projeto simples com HTML, CSS, JS e NodeJS, para praticar programação. O projeto contém um servidor com NodeJS com Express e MongoDB. Frontend feito em HTML, CSS e JS.

## Funcionalidades:

* Cadastrar produto: Nome produto, valor, imagem
* Listagem de produtos, card com todas as informações
* Carrinho de produtos, com funcionalidade de remover produtos
* Hitórico de compras
* Cadastro de usuário
* Login
* Áreas restrita com acesso apenas a pessoa logadas

</br>
</br>

## Execução do Projeto
</br>

### Máquina Local

#### Requisitos: 
<div style="display: flex; gap: 20px; flex-direction: column;">
    <a href="https://nodejs.org/pt/download" style="display: flex; gap: 20px; align-items: center;">
        <img heigth="40px" width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" /> 
            <div>NodeJS</div>
    </a>
    <a href="https://nodejs.org/pt/download" style="display: flex; gap: 20px; align-items: center;">
        <img heigth="40px" width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg" /> 
            <div>Mongo DB</div>
    </a>
</div>
</br>

#### Executando o Projeto:
* Entrar na pasta <b>back</b> do projeto
* Executar via terminal <b>npm install</b>
* Executar via terminal <b>npm start</b>
* Abrir no navegador <b>http://localhost:3000</b>

</br>

### Docker
#### Requisitos:
<a href="https://nodejs.org/pt/download" style="display: flex; gap: 20px; align-items: center;">
    <img heigth="40px" width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg" /> 
        <div>Docker</div>
</a>

#### Passos para execução:
* Entrar na pasta principal do projeto onde tem o <b>Dockerfile</b>
* Executar o comando para construir a imagem: <b>docker build -t coffee-shop .</b>
* Executar o comando para rodar um container com a imagem: <b>docker run -p 3000:3000 coffee-shop</b>
* Abrir no navegador <b>http://localhost:3000</b>