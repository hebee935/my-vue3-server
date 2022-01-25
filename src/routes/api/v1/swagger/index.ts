import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router, } from 'express';
import path from 'path';

import config from '../../../../../config';
import definitions from './definitions';

const router = Router();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Indoc Express API',
    version: '1.0.0',
  },
  schemas: ['http', 'https'],
  host: `${config.host}:${config.port}`,
  servers: [{ url: '/api/v1' }],
  security: [
		{
			bearer: [],
		}
	],
  definitions,
};

const options = {
  swaggerDefinition,
  apis: [ path.join(__dirname, '../*.ts'), path.join(__dirname, '../../../../db/models/*.ts') ]
};

const swaggerSpec = swaggerJSDoc(options);
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
