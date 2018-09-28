import http from '@/app/http';

export default {
  login: (params: { username: string, pwd: string }) => {
    return http.post('/api-admin/login', params);
  },
  logout: () => {
    return http.get('/api-admin/logout', null);
  },
};
