import http from '@/app/http';

export default {
  videoList(params: { pageNum: number, pageSize: number }) {
    return http.post('/api-liveapp/adminMatchVideo/getMatchVideoList', params);
  },
  getVideo(videoId: string | number) {
    return http.get(`/api-liveapp/adminMatchVideo/getMatchVideoDetail/${videoId}`);
  },
  editVideo(params: any) {
    return http.put(`/api-liveapp/adminMatchVideo/editMatchVideo`, params);
  },
  createVideo(params: any) {
    return http.post(`/api-liveapp/adminMatchVideo/createMatchVideo`, params);
  },
  deleteVideo(videoId: string | number) {
    return http.delete(`/api-liveapp/adminMatchVideo/deleteMatchVideo/${videoId}`);
  },
};
