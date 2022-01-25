'use strict';

import fs from 'fs';
import path from 'path';
import appRoot from 'app-root-path';
import pino from 'pino';
import pinoHttp from 'pino-http';

import config from '../../config';
import { verify } from './token';

let dest = pino.destination(1);
if (config['logDest']) {
  try {
    const dirpath = path.join(appRoot.path, 'logs');
    if (!fs.existsSync(dirpath)) fs.mkdirSync(dirpath);
    dest = pino.destination({
      dest: './logs/all-logs',
    });
  } catch (err) {
    console.log('can not make log dir!!!!!');
  }
}

const pinoOpts = {
  level: config.loggerLevel,
  prettyPrint: config.logPretty,
  colorize: config.logPretty,
  enabled: config.env !== 'test',
  timestamp: () => {
    const date = new Date();
    return (
      ',"time":' + date.getTime() + ',"localtm":"' + date.toLocaleString() + '"'
    );
  },
};

export const logger = pino(pinoOpts, dest);

const pinoHttpOpts = {
  // Define a custom logger level
  // (http status가 400~500 사이인 경우 자동으로 level을 정해서 logging)
  customLogLevel: (res: any, err: any) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    }
    // http raw traffic logger를 가장 낮은 level로 정의한다. (debug level보다 낮다)
    return 'trace';
  },

  // logging 형태를 정의한다 (여기서 logging을 ignore할 url path를 정의한다)
  autoLogging: {
    ignorePaths: config.ignores,
  },

  // Define custom serializers (여기서는 전체 http attribute중에서 logging에 필요한 것만을 추린다.)
  serializers: {
    // 기본적으로 다음과 같은 default가 있다
    err: pino.stdSerializers.err,
    req: (req: any) => {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
        user: verify(req.headers)?.id,
        remoteAddress: req.remoteAddress,
      };
    },
    res: (res: any) => {
      return {
        statusCode: res.statusCode,
      };
    },
  },

  // 'false'인 경우 http request, response에 대한 full attribute가 logging된다.
  wrapSerializers: true,

  // Override attribute keys for the log object
  customAttributeKeys: {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'timeTaken',
  },

  reqCustomProps: (req: any) => {
    return {
      body: req.body,
    };
  },
};

export const loggerMiddleware = pinoHttp({
  logger,
  ...pinoHttpOpts,
});
