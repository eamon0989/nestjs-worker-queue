## Description

A simple showcase of how to split a bullmq queue out to a separate process in NestJs.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run build

# start redis instance in docker
$ npm run start:docker

# watch mode
$ npm run start:dev

# start worker
$ npm run start:worker
```

Send an empty post request to http://localhost:3000/job (e.g. `curl -X POST http://localhost:3000/job`) and you will see the process id logged to the console, once from the main app which adds the job to the queue, and then from the queue with a different PID.

## Heroku

This app can be deployed to heroku, where a main `web` process will start and also a `worker` process for the queue.
The `worker` process can be scaled up by adding multiple workers.
