import http from '../../app/http';

export default {
  players(params: {
    pageSize: number;
    pageNum: number;
    playerName: string;
  }) {
    return http.post('/api-liveapp/adminPlayer', params);
  },
  create(params: any) {
    return http.post('/api-liveapp/adminPlayer/create', params);
  },
  edit(params: any) {
    return http.put('/api-liveapp/adminPlayer/edit', params);
  },
  delete(id: number) {
    return http.delete(`/api-liveapp/adminPlayer/delete/${id}`, null);
  },
  getPlayerById(id: number) {
    return http.get(`/api-liveapp/adminPlayer/${id}`, null);
  },
};
