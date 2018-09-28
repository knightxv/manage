import http from '@/app/http';
import { IMatchInfoItem } from '@/services/apiDataType';

export default {
  matchs(params: { pageNum: number, pageSize: number }) {
    return http.post('/api-liveapp/adminMatch', params);
  },
  create(params: IMatchInfoItem) {
    return http.post('/api-liveapp/adminMatch/create', params);
  },
  delete(id: number) {
    return http.delete(`/api-liveapp/adminMatch/delete/${id}`, null);
  },
  edit(params: IMatchInfoItem) {
    return http.put(`/api-liveapp/adminMatch/edit`, params);
  },
  enable(id: number) {
    return http.put(`/api-liveapp/adminMatch/enable/${id}`, null);
  },
  unable(id: number) {
    return http.put(`/api-liveapp/adminMatch/unable/${id}`, null);
  },
  getMatch(id: number) {
    return http.get(`/api-liveapp/adminMatch/${id}`, null);
  },
};
