!["ramenGo logo"](src/assets/ramengo_header_readme.png)

**Essa é o frontend da aplicação [ramenGo](http://54.234.245.214/). Você pode acessar o repositório do backend [aqui](https://github.com/pinhob/ramengo-front).**

Consulte a documentação abaixo para mais informações sobre o projeto.

---
## Sumário
- [Requisitos](#requisitos)
- [Rodando o projeto](#rodando-o-projeto)
  - [Com Docker](#com-docker)
  - [Manualmente](#manualmente)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Próximos passos](#próximos-passos)

## Requisitos
Esse projeto é feito usando somente `HTML`, `CSS` e `JavaScript`, então você só precisa de um navegador para executá-lo! :) 

## Rodando o projeto

### Com Docker
Caso você tenha o docker instalado, execute na raiz do projeto, via terminal, os seguintes comandos: 
```
sudo docker build -t ramengo-frontend-img .
docker run -d -p 80:80 --name ramengo-frontend ramengo-frontend-img
```

A aplicação estará disponível no endereço `http://localhost:80`.

### Manualmente

Você também pode executar manualmente o arquivo.

O que recomendo é usar alguma extensão que carregue junto ao arquivo `HTML` os arquivos `.css` e `.js`, como a [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), do VS Code, e inicializá-la abrindo o arquivo `index.html`. 

## Estrutura do projeto 
```
├── README.md
├── index.html
├── order.html
├── Dockerfile
├── src
│   ├── assets
│   │   └── images...
│   ├── css
│   │   ├── pages
│   │   │   ├── index.css
│   │   │   ├── order.css
│   │   ├── reset.css
│   │   ├── styles.css
│   │   ├── variables.css
│   ├── js
│       ├── order_page
│   ├── index.js
```
O ponto de início desse projeto é o `index.html`, que armazena a página principal da aplicação.

`order.html` é a segunda página da aplicação, que exibe os dados do pedido realizado.

Os arquivos que preenchem as duas páginas estão dentro de `/src`, sendo `/assets` para armazenar as imagens, `/css` os arquivos de estilo e `/js` os arquivos JavaScript das duas páginas.

Dentro do diretório `/css` temos um `reset.css` para retirar a estilização padrão feita pelos navegadores, `variables.css` para definir as informações das variáveis de nosso style guide e `styles.css` para as classes comuns às duas páginas da aplicação. Os estilos específicos de cada página estão dentro do repositório `/pages`.

## Próximos passos
- Adicionar o Vite para tooling e então:
  - Adicionar variáveis de ambiente
  - Adicionar testes utilizando o Jest
  - Adicionar scripts de inicialização manual, como o `vite dev`.
  - Editar o Dockerfile para que use o Vite.
- Atribuir um domínio a nossa instância EC2.
