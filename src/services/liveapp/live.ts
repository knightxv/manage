import http from '../../app/http';
import { ILiveInfoData } from '../apiDataType';

export default {
  lives(params: { pageNum: number, pageSize: number }): Promise<ILiveInfoData> {
    return http.post('/api-liveapp/adminLive', params);
  },
  create(params: any) {
    return http.post('/api-liveapp/adminLive/create', params);
  },
  edit(params: any) {
    return http.put('/api-liveapp/adminLive/edit', params);
  },
  delete(id: number) {
    return http.delete(`/api-liveapp/adminLive/deleted/${id}`);
  },
  getLive(id: number) {
    return http.get(`/api-liveapp/adminLive/${id}`);
  },
  getOnlneCount(id: number) {
    return http.get(`/api-liveapp/adminLive/getOnlneCount/${id}`);
  },
  /** 获取全民直播流 */
  getQuanMinUrl(url: string) {
    return http.get(`/api-liveapp/adminLive/test/getQuanMinUrl`, {
      url,
    });
  },
  /** 获取花椒直播流 */
  getHuaJiaoUrl(url: string) {
    return http.get(`/api-liveapp/adminLive/test/getHuaJiaoUrl`, {
      url,
    });
  },
};
