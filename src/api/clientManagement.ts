import { apiUser1 } from '@/api/config';

export default {
    // 客户分类管理
    getClientClassList: apiUser1 + '/channelClassification/query',
    addClientClass: apiUser1 + '/channelClassification/insert',
    updateClientClass: apiUser1 + '/channelClassification/replaceType',
    deleteClientClass: apiUser1 + '/channelClassification/remove',
    batchDeleteClientClass: apiUser1 + '/channelClassification/remove',

    // 客户管理
    getClientList: apiUser1 + '/channelLibrary/queryChennelLibrary',
    addClient: apiUser1 + '/channelLibrary/insertChennelLibrary',
    updateClient: apiUser1 + '/channelLibrary/updateChennelLibrary',
    deleteClient: apiUser1 + '/channelLibrary/remove',
    batchDeleteClient: apiUser1 + '/channelLibrary/remove',
    resetPwdClient: apiUser1 + '/channelLibrary/reset',
};