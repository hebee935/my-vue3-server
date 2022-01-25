'use strict';

import express from 'express';

import api_v1 from './routes/api/v1';

export default function (app: express.Application) {
  app.use('/heartbeat', (_req, res) => {
    res.json({ success: true });
  });

  app.use('/api/v1', api_v1);
}
