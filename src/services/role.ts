import http from '../app/http';

export default {
    findList(params: { page: number, limit: number, name: string } | null) {
        return http.get('/api-admin/role', params);
    },
    findById: (id: number) => {
        return http.get('/api-admin/role/userId/' + id);
    },

    add() {
        return http.post(`/api-admin/role`, null);
    },
    update() {
        return http.put('/api-admin/role', null);
    },

    // 单个删除role
    remove: (id: number) => {
        return http.delete(`/api/v1/roles/${id}`);
    },

    // 批量删除，传ids数组
    removeBatch: (ids: any) => {
        return http.delete(`/api/v1/roles/batch/${ids}`);
    },
};
