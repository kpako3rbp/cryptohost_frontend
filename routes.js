export const baseUrl = 'http://192.168.1.56:8000'; // TODO поменять URL
const apiPath = 'api';

export default {
  // CRUD
  getOne: (pathname, id) => [baseUrl, apiPath, pathname, 'public', id].join('/'),
  getAll: (pathname) => [baseUrl, apiPath, pathname, 'public'].join('/'),

  getMain: (pathname, id) => [baseUrl, apiPath, pathname, 'main', 'public'].join('/'),
  getPaths: (pathname) => [baseUrl, apiPath, pathname, 'paths', 'public'].join('/'),
};
