import http from './http';

export const getGalleryList = (params?: Object) => http.get('/pics/list', params)