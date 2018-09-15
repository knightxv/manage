import http from '../../app/http';
import { IMatchScheduleInfoItem } from '@/services/apiDataType';

export default {
  schedules(params: {
    pageSize: number;
    pageNum: number;
    matchId: number;
  }) {
    return http.post('/api-liveapp/adminMatchSchedule', params);
  },
  changeMatchStage(params: {
    matchScheduleId: number;
    matchStageType: string;
  }) {
    return http.post('/api-liveapp/adminMatchSchedule/changeMatchStage', params);
  },
  create(params: IMatchScheduleInfoItem) {
    return http.post('/api-liveapp/adminMatchSchedule/create', params);
  },
  delete(id: number) {
    return http.delete(`/api-liveapp/adminMatchSchedule/delete/${id}`, null);
  },
  edit(params: IMatchScheduleInfoItem) {
    return http.put(`/api-liveapp/adminMatchSchedule/edit`, params);
  },
  hidden(id: number) {
    return http.get(`/api-liveapp/adminMatchSchedule/view/hidden/${id}`, null);
  },
  show(id: number) {
    return http.get(`/api-liveapp/adminMatchSchedule/view/show/${id}`, null);
  },
  getSchedule(id: number) {
    return http.get(`/api-liveapp/adminMatchSchedule/${id}`, null);
  },
  getPlayersOnTheCourtState(matchScheduleId: number) {
    return http.get(`/api-liveapp/adminMatchSchedulePlayerStatus/${matchScheduleId}`);
  },
};
