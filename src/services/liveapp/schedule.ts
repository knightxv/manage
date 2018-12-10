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
  refreshPlayerActionCache(matchScheduleId: number) {
    return http.put(`/api-liveapp/adminMatchSchedulePlayerAction/refreshPlayerActionCache/${matchScheduleId}`);
  },
  // matchScheduleId: number, matchSchedulePlayerStatus: string, matchTeamPlayerId: number
  batchChangeMatchSchedulePlayer(matchSchedulePlayerStatusQOS: any[]) {
    return http.post(`/api-liveapp/adminMatchSchedulePlayerStatus/batchChangeMatchSchedulePlayer`, {
      matchSchedulePlayerStatusQOS,
    });
  },
  addBindSlideshow(params: { matchScheduleId: number, slideshowId: number }) {
    return http.post(`/api-liveapp/adminMatchScheduleSlideshow/add`, params);
  },
  unBindSlideShow(params: { matchScheduleId: number, slideshowId: number }) {
    return http.delete(`/api-liveapp/adminMatchScheduleSlideshow/deleted`, params);
  },
  getScheduleBindSlideshows(matchScheduleId: string) {
    return http.get(`/api-liveapp/adminMatchScheduleSlideshow/${matchScheduleId}`);
  },
  addPlayerAndAddMatchTeamRel(params: string) {
    return http.post(`/api-liveapp/adminMatchSchedulePlayerAction/addPlayerAndAddMatchTeamRel`, params);
  },
  // 竞猜
  getMatchScheduleGuessGameList(scheduleId: string | number) {
    return http.get(`/api-liveapp/adminGuessGame/getMatchScheduleGuessGameList/${scheduleId}`, null);
  },
  getMatchGuessGameDetail(matchScheduleGuessGameId: string | number) {
    return http.get(`/api-liveapp/adminGuessGame/getMatchGuessGameDetail/${matchScheduleGuessGameId}`, null);
  },
  createMatchScheduleGuessGame(params: any) {
    return http.post(`/api-liveapp/adminGuessGame/matchScheduleGuessGameCreate`, params);
  },
  deleteMatchScheduleGuessGame(matchScheduleGuessGameId: string | number) {
    return http.delete(`/api-liveapp/adminGuessGame/matchScheduleGuessGameDeleted/${matchScheduleGuessGameId}`, null);
  },
  editMatchScheduleGuessGame(params: any) {
    return http.put(`/api-liveapp/adminGuessGame/matchScheduleGuessGameEdit`, params);
  },
  startMatchScheduleGuessGame(matchScheduleGuessGameId: string | number) {
    return http.put(`/api-liveapp/adminGuessGame/startMatchScheduleGuessGame/${matchScheduleGuessGameId}`, null);
  },
  stopMatchScheduleGuessGame(matchScheduleGuessGameId: string | number) {
    return http.put(`/api-liveapp/adminGuessGame/stopMatchScheduleGuessGame/${matchScheduleGuessGameId}`, null);
  },
  endMatchScheduleGuessGame(params: any) {
    return http.put(`/api-liveapp/adminGuessGame/endMatchScheduleGuessGame`, params);
  },
  cancelMatchScheduleGuessGame(matchScheduleGuessGameId: string | number) {
    return http.put(`/api-liveapp/adminGuessGame/cancelMatchScheduleGuessGame/${matchScheduleGuessGameId}`, null);
  },
};
