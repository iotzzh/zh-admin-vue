import { apiWH } from '@/api/config';

export default 
{
    getCollectionSubjectLibraryList: apiWH + '/collectionSubjectLibrary/list', // 收款主体列表
    getAllRegionList: apiWH + '/regionalDatabase/queryAllRegion', // 获取省市区列表
    getClientClassList: apiWH + '/channelClassification/query', // 获取客户类别数据列表
    getPartnerList: apiWH + '/partnerLibrary/list', // 获取合作商列表
    getClientList: apiWH + '/channelLibrary/queryChennelLibrary', // 获取客户（医院列表）
};
