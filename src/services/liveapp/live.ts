import http from '../../app/http';
import { ILiveInfoData } from '../apiDataType';
import { SocketRegisterType } from '@/app/typeDef';

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
  getLive(liveId: number | string) {
    return http.get(`/api-liveapp/adminLive/${liveId}`);
  },
  clearLiveUserClickTimes(liveId: number | string) {
    return http.put(`/api-liveapp/adminLive/clearLiveUserClickTimes/${liveId}`);
  },
  getOnlneCount(scheduleId: number | string) {
    return http.get(`/api-liveapp/adminLive/getOnlneCount/${SocketRegisterType.MATCH_SCHEDULE}_${scheduleId}`, null);
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
  getLiveSlideShowList(liveId: number | string) {
    return http.get(`/api-liveapp/adminLiveSlideshow/${liveId}`, null);
  },
  addBindSlideshow(params: { liveId: number | string, slideshowId: number }) {
    return http.post(`/api-liveapp/adminLiveSlideshow/add`, params);
  },
  unBindSlideShow(params: { liveId: number | string, slideshowId: number }) {
    return http.delete(`/api-liveapp/adminLiveSlideshow/deleted`, params);
  },
  editHomePageShow(liveId: number | string, homePageShow: boolean) {
    return http.put(`/api-liveapp/adminLive/editHomePageShow`, {
      id: liveId,
      homePageShow,
    });
  },
  getLiveIntroduce(liveId: number | string) {
    return http.get(`/api-liveapp/adminLive/getLiveIntroduce/${liveId}`, null);
  },
  editOpenChat(params: any) {
    return http.put(`/api-liveapp/adminLive/editOpenChat`, params);
  },
  editLiveIntroduce(liveId: number | string, introduce: string) {
    return http.put(`/api-liveapp/adminLive/editLiveIntroduce`, {
      id: liveId,
      introduce,
    });
  },
  editSupportGiftGroup(params: { id: number | string, supportGiftGroupId: number }) {
    return http.put(`/api-liveapp/adminLive/editSupportGiftGroup`, params);
  },
};
