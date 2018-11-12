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
};
