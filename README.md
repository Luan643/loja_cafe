
# Coffee Shop

Projeto simples com HTML, CSS, JS e NodeJS, para praticar programação. O projeto contém uma servidor com NodeJS com Express e MongoDB. Frontend feito em HTML, CSS e JS. 

Funcionalidades:

* Cadastrar produto: Nome produto, valor, imagem
* Listagem de produtos, card com todas as informações
* Carrinho de produtos, com funcionalidade de remover produtos
* Hitórico de compras
* Cadastro de usuário
* Login
* Áreas restrita com acesso apenas a pessoa logadas


## Como Executar o Projeto

### Máquina Local

#### Requisitos: NodeJS e MongoDB instalados
#### Passos para execução:
* Entrar na pasta back do projeto
* Executar via terminal *npm install*
* Executar via terminal npm start
* Abrir no navegador *http://localhost:3000*


### Docker
#### Requisitos: Docker instalado

#### Passos para execução:
* Entrar na pasta principal do projeto onde tem o *Dockerfile*
* Executar o comando para construir a imagem: *docker build -t coffee-shop .*
* Executar o comando para rodar um container com a imagem: *docker run -p 3000:3000 coffee-shop*
* Abrir no navegador *http://localhost:3000*