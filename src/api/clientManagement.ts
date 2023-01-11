import { api } from '@/api/config';

export default {
    // 客户管理
    getClientList: api + '/client/list',
    addClient: api + '/client/add',
    updateClient: api + '/client/update',
    deleteClient: api + '/client/delete',
    batchDeleteClient: api + '/client/batchDelete',
};