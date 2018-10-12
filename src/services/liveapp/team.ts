import http from '../../app/http';

export default {
  teams(params: {
    pageSize: number;
    pageNum: number;
    matchId: number;
  }) {
    return http.post('/api-liveapp/adminMatchTeam', params);
  },
  create(params: any) {
    return http.post('/api-liveapp/adminMatchTeam/create', params);
  },
  delete(id: number) {
    return http.delete(`/api-liveapp/adminMatchTeam/delete/${id}`, null);
  },
  edit(params: any) {
    return http.put(`/api-liveapp/adminMatchTeam/edit`, params);
  },
  getTeam(id: number) {
    return http.get(`/api-liveapp/adminMatchTeam/${id}`, null);
  },
  editMatchTeamPoints(params: {
    id: number,
    teamPoints: number,
  }) {
    return http.post(`/api-liveapp/adminMatchTeam/editMatchTeamPoints`, params);
  },
  getTeamInfo(matchTeamId: number | string) {
    return http.get(`/api-liveapp/adminMatchTeam/${matchTeamId}`, null);
  },
  addTeamPlayer(params: any) {
    return http.post(`/api-liveapp/adminMatchTeam/createMatchTeamPlayer`, params);
  },
  batchAddTeamPlayer(params: any) {
    return http.post(`/api-liveapp/adminMatchTeam/batchCreateMatchTeamPlayer`, params);
  },
  editTeamPlayer(params: any) {
    return http.put(`/api-liveapp/adminMatchTeam/edit/MatchTeamPlayers`, params);
  },
  deleteTeamPlayer(teamPlayerId: string | number) {
    return http.delete(`/api-liveapp/adminMatchTeam/deleted/MatchTeamPlayers/${teamPlayerId}`);
  },
};
