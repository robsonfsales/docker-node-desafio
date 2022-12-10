# Desafio Docker dockercompose + proxy-reverso + node

Nesse desafio, temos :
- uma imagem de aplicação node, 
- uma imagem de um proxy-reverso com nginx 
- uma imagem com um banco de dados mysql 5.7.

O detalhe maior dessa configuração, está no parametro **entrypoint** do arquivo **docker-compose.yaml** da imagem node e proxy-reverso, pois existe uma dependência entre os processos, que podem afetar a inicialização de cada contêiner.

Como solução, utilizou **[dockerize](https://github.com/jwilder/dockerize)** que verifica se os processos já inicializaram.

Outro ponto, foi o ajuste feito no arquivo nginx.conf que receberá todas as requisições na porta 8080 e encaminhará para a aplicação node rodando na porta 3000.

Na aplicação node, foi utilizada uma biblioteca para geração de nomes aleatórios, gerados em cada requisição solicitada, que devolverá como resultado uma página com a lista de nomes cadastrados.

E toda vez que a aplicação node inicializa, cria a tabela caso não tenha criado antes, para inserção dos registros.

## Ambiente
Para executar esse projeto é necessário possuir o Docker instalado e configurado.

## Construindo e executando as imagens do projeto a partir do arquivo docker-compose.yaml
> docker-compose up -d --build

## Finalizando os processos
> docker-compose down