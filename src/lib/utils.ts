import axios from 'axios';
import fs from 'fs';

export const call = {
  get: (uri: string, config = {}) => axios.get(uri, config),
  post: (uri: string, data = {}, config = {}) => axios.post(uri, data, config),
  put: (uri: string, data = {}, config = {}) => axios.put(uri, data, config),
  delete: (uri: string, config = {}) => axios.delete(uri, config),
};

export const writeFile = async (name: string, dir = '', data: any) => {
  const rootPath = process.env.PWD;
  const dirpath = `${rootPath}/data/${dir}`;
  if (!fs.existsSync(dirpath)) fs.mkdirSync(dirpath);
  const filepath = `${dirpath}/${name}`;
  fs.writeFileSync(filepath, data);
};

export const readFileStream = (path: string) => {
  const rootPath = process.env.PWD;
  const filePath = `${rootPath}/data/${path}`;
  return fs.createReadStream(filePath);
};
