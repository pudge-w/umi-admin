import http from './http';

export const getGalleryList = (params?: Object) => http.get('/pics/list', params);

export const getHighList = (params?: Object) => http.get('/hightables/list', params);

export const delHighList = (params?: Object) => http.post('/hightables/delete', params);

export const getCity = (params?: Object) => http.get('/cities/list', params);

export const getCityList = (params?: Object) => http.post('/cities/manage/list', params);