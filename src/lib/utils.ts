import axios from 'axios';

export const call = {
  get: (uri: string, config = {}) => axios.get(uri, config),
  post: (uri: string, data = {}, config = {}) => axios.post(uri, data, config),
  put: (uri: string, data = {}, config = {}) => axios.put(uri, data, config),
  delete: (uri: string, config = {}) => axios.delete(uri, config),
};