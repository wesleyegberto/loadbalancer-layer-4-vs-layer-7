# Load Balancer - Layer 4 vs Layer 7

Projeto para mostrar as diferenças entre um Load Balancer que atua na Layer 4 e um que atua na Layer 7.

## Notas

LB é uma solução de rede utilizada para distribuir tráfego para multiplos servidores disponíveis.
LB ajudam a distribuir a carga entre um conjunto de recursos disponíveis.
O cliente enxerga apenas o LB e este enxerga todos os recursos.

- melhora a disponibilidade e responsividade da aplicação
- ajudar a evitar a sobrecarga de um servidor
- provê para o cliente um ponto único de acesso aos servidores
- existem diferentes algoritmos de balanceamento

Algoritmos de balanceamento:

- round robin
- last connection method
- least response time method
- hashing methods
- last bandwidth method

O LB pode atuar nas camadas 4 e 7 do modelo OSI.

### Layer 4

O LB atua apenas na camada de transporte, tomando decisões apenas em TCP e UDP.
Não enxerga o conteúdo da requisição, apenas redireciona para o servidor de destino alterando o IP (NAT).

Vantagens:

- LB simples
- eficiente (não olha os dados)
- mais seguro
- apenas 1 conexão TCP
- utiliza NAT

Contras:

- LB não é inteligente
- não aplicável para microservices
- sem é cacheável

### Layer 7

O LB atua na camada de aplicação, podendo tomar decisões baseadas no TCP, UDP ou no protocolo da aplicação (HTTP, SSL, etc).
Para cada requisição que ele recebe, é criado uma nova conexão para o servidor de destino, tendo assim duas conexões para cada cliente.

Vantagens:

- LB pode ser inteligente
- cacheável
- bom para microservices

Desvantagens:

- mais caro computacionalmente
- descripta os dados (termina o TLS)
- duas conexões TCP (dois timeouts)
- precisa compartilhar o certificado TLS

## Configurações

### LB Layer 4

O LB Layer 4 (configuração `lb-layer-4.cfg`) está configurado para atuar somente no nível de TCP:

```ini
mode tcp
```

### LB Layer 7

O LB Layer 7 (configuração `lb-layer-7.cfg`) está configurado para atuar no HTTP:

```ini
mode http
```

E como temos duas conexões, podemos ter dois timeouts diferentes:

```ini
timeout client 30000
timeout server 10000
```

## Rodar

No Docker Compose estão declarados:

- servidor 1
- servidor 2
- LB Layer 4
- LB Layer 7

Para rodar:

```sh
docker-compose up
```

Para fazer uma requisição:

```sh
# servidor 1
curl http://localhost:4444

# servidor 2
curl http://localhost:5555

# LB Layer 4
curl http://localhost:8080

# LB Layer 7
curl http://localhost:9090/server1
curl http://localhost:9090/server2
```

Note que os logs para as requisições vindas do LB Layer 7 têm o IP de origem diferente e um header `x-forwarded-for`.

## Referências

- [What is Load Balancing](https://www.citrix.com/solutions/app-delivery-and-security/load-balancing/what-is-load-balancing.html)

