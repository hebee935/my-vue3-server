import { connect, connection } from 'mongoose';

import config from '../../config';

let cachedConn: any = null;
export const conn = async () => {
  console.log('ready state', connection.readyState);
  if (cachedConn && connection.readyState) {
    console.log('use previous opened database');
    return cachedConn;
  }
  cachedConn = await connect(config.mongo);
  console.log('new db connect!');
  return cachedConn;
};