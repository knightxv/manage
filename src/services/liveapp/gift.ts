// /adminSupportGift/list

import http from '../../app/http';
// import { ILiveInfoData } from '../apiDataType';
// import { SocketRegisterType } from '@/app/typeDef';

export default {
  giftList(params: { pageNum: number, pageSize: number }) {
    return http.post('/api-liveapp/adminSupportGift/list', params);
  },
  createGift(params: any) {
    return http.post('/api-liveapp/adminSupportGift/create', params);
  },
  deleteGift(giftId: number) {
    return http.delete(`/api-liveapp/adminSupportGift/deleted/${giftId}`, null);
  },
  editGift(params: any) {
    return http.put(`/api-liveapp/adminSupportGift/edit`, params);
  },
  getGiftDetail(giftId: number | string) {
    return http.get(`/api-liveapp/adminSupportGift/${giftId}`, null);
  },
  getGiftGroupList() {
    return http.get(`/api-liveapp/adminSupportGiftGroup/supportGiftGroupList`, null);
  },
  getGiftGroupDetail(giftGroupId: number | string) {
    return http.get(`/api-liveapp/adminSupportGiftGroup/supportGiftGroupDetail/${giftGroupId}`, null);
  },
  editGiftGroup(params: any) {
    return http.put(`/api-liveapp/adminSupportGiftGroup/supportGiftGroupEdit`, params);
  },
  createGiftGroup(supportGiftGroupName: string) {
    return http.post(`/api-liveapp/adminSupportGiftGroup/supportGiftGroupCreate/${supportGiftGroupName}`, null);
  },
  deleteGiftGroup(giftGroupId: number | string) {
    return http.delete(`/api-liveapp/adminSupportGiftGroup/supportGiftGroupDeleted/${giftGroupId}`, null);
  },
  editSupportGiftToGroup(params: { supportGiftToGroupId: number | string, supportGiftIds: number[] } ) {
    return http.put(`/api-liveapp/adminSupportGiftGroup/addSupportGiftToGroup`, params);
  },
};
