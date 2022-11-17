import { api } from '@/api/config';

export default {
    getOrgList: api + '/org/list',
    addOrg: api + '/org/add',
    updateOrg: api + '/org/update',
    deleteOrg: api + '/org/delete',
};