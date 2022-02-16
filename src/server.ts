import express from 'express';
import cors from 'cors';
// import methodOverride from 'method-override';

import config from '../config';
import { conn } from './db';
import { logger, loggerMiddleware } from './lib/logger';
import routing from './routing';

const app: express.Application = express();

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// app.use(methodOverride());
app.use(loggerMiddleware);

runServer();

async function runServer() {
  await conn();

  routing(app);

  app.listen(config.port, () => {
    logger.info(`${config.env} server listening on ${config.port} port!!`);
  });
}
