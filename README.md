## Description

A simple showcase of splitting a bullmq queue out to a separate process.

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

Send a post request to http://localhost:3000/job and you will see the process id logged to the console, 
once from the main app which adds the job to the queue, and then from the queue with a different PID.

## Heroku

This app can be deployed to heroku, where a main `web` process will start and also a `worker` process for the queue.
The `worker` process can be scaled up by adding multiple workers.