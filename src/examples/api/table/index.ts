import { api } from '@/api/config';

export default {
    getUserList: api + '/user/list',
    addUser: api + '/user/add',
    updateUser: api + '/user/update',
    deleteUser: api + '/user/delete',
    batchDeleteUser: api + '/user/batchDelete',
};