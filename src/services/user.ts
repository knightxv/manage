import http from '../app/http';

export default {
  tokenUser: () => {
    return http.get('/api-admin/user/currentUser', null);
  },
  changeProfile: () => {
    return http.patch('/http/v1/users/profile', null);
  },
  findList: () => {
    return http.get('/api-admin/user', null);
  },
  addUser: () => {
    return http.post('/api-admin/user', null);
  },
  // 修改用户
  editUser: () => {
    return http.put('/api-admin/user', null);
  },
  // 删除用户
  removeUser: () => {
    return http.delete('/api-admin/user', null);
  },
};
