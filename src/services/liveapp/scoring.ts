import http from '../../app/http';
import { IScheduleScoringInfoData } from '@/services/apiDataType';

export default {
  // getTeam(id: number) {
  //   return http.get(`/api-liveapp/adminMatchTeam/${id}`, null);
  // },
  getMatchScheduleInfo(params: {
    matchPlayerActionTypes: string[];
    matchScheduleId: number;
  }): Promise<IScheduleScoringInfoData>  {
    return http.post('/api-liveapp/adminMatchSchedulePlayerAction', params);
  },
  /** 推送行为 */
  edit(params: {
    failTimes: 1 | 0, // 未中
    matchScheduleId: number, // 赛程id
    matchTeamPlayerId: number, // 球员id
    successTimes: 1 | 0, // 中的次数
    matchPlayerActionType: string,
    mathType: 'ADD' | 'MINUS', // 行为 ADD, MINUS -> successTimes | ADD -> failTimes
  }) {
    return http.put('/api-liveapp/adminMatchSchedulePlayerAction/edit', params);
  },
  /** 推送到直播间(每次更新行为) */
  pushLive(matchScheduleId: number | string) {
    return http.get(`/api-liveapp/adminMatchSchedulePlayerAction/push/${matchScheduleId}`);
  },
};
