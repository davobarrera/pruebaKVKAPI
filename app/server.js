
import * as config from './config.js';
import loaders from './loaders/index.js';
import express from 'express';
import bodyParser from 'body-parser';
const DI = {
    models: {}
};
async function startServer() {
  const app = express();
  
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  loaders({config,DI,express,app})

  app.listen(process.env.PORT | config.port, err => {
    if (err) {
        console.error(err);
      process.exit(1);
      return;
    }
    console.log('Inicio el server en ' + (process.env.PORT | config.port));
  });
}

startServer();