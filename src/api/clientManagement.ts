import { apiWH } from '@/api/config';

export default {
    // 客户分类管理
    getClientClassList: apiWH + '/channelClassification/query',
    addClientClass: apiWH + '/channelClassification/insert',
    updateClientClass: apiWH + '/channelClassification/replaceType',
    deleteClientClass: apiWH + '/channelClassification/remove',
    batchDeleteClientClass: apiWH + '/channelClassification/remove',

    // 客户管理
    getClientList: apiWH + '/channelLibrary/queryChennelLibrary',
    addClient: apiWH + '/channelLibrary/insertChennelLibrary',
    updateClient: apiWH + '/channelLibrary/updateChennelLibrary',
    deleteClient: apiWH + '/channelLibrary/remove',
    batchDeleteClient: apiWH + '/channelLibrary/remove',
    resetPwdClient: apiWH + '/channelLibrary/reset',
};