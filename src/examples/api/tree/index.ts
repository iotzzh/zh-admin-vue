import { apiMock } from '@/api/config';

export default {
    getOrgList: apiMock + '/org/list',
    addOrg: apiMock + '/org/add',
    updateOrg: apiMock + '/org/update',
    deleteOrg: apiMock + '/org/delete',
};