import http from '../../app/http';
import { systemType } from '@/app/typeDef';

export default {
  uploadImage(file: File) {
    const imgFormData = new FormData();
    imgFormData.append('file', file);
    const config = {
      headers: { 'Content-Type': 'multipart/form-data'},
    };
    return http.post(`/api-common-server/upload/image/${systemType.APP}`, imgFormData, config);
  },
};
