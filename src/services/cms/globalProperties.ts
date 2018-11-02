import http from '@/app/http';
import { systemType } from '@/app/typeDef';

export default {
  clearCache() {
    return http.put(`/api-cms/adminGlobalProperties/clearCache/${systemType.APP}`, null);
  },
  saveProperties(globalPropertiesQOList: any[]) {
    return http.put(`/api-cms/adminGlobalProperties/saveGlobalProperties`, {
      globalPropertiesQOList,
      systemType: systemType.APP,
    });
  },
  getGlobalProperties() {
    return http.get(`/api-cms/adminGlobalProperties/${systemType.APP}`, null);
  },
};
