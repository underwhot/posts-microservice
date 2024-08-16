This is a [Nest.js](https://nestjs.com/) posts microservice.<br>
RestAPI, GraphQL, Postgress, TypeORM, Swagger, RabbitMQ

## Getting Started

Congigure .env via .env.example.<br>

Pull repository and install dependencies:

```bash
npm install
```

Run docker containers:

```bash
docker-compose up -d --build
```

Run server:

```bash
npm run start
```

Application is running on: [http://localhost:3001](http://localhost:3001)<br>
Swagger is running on: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)<br>
GraphQL playground is running on: [http://localhost:3001/graphql](http://localhost:3001/graphql)<br>

Additional, run RabbitMQ container:

```bash
docker pull rabbitmq
docker run -d --hostname my-rabbit --name some-rabbit -p 15672:15672 -p 5672:5672 rabbitmq
```
