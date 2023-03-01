import { apiUser1 } from '@/api/config';

export default {
    // 诊室管理
    getDoctorAccountList: apiUser1 + '/doctorAccount/list', // 诊室管理列表
    addDoctorAccount: apiUser1 + '/doctorAccount/add',
    updateDoctorAccount: apiUser1 + '/doctorAccount/modify',
    deleteDoctorAccount: apiUser1 + '/doctorAccount/remove',
    batchDoctorAccount: apiUser1 + '/doctorAccount/remove',

    updatePwd: apiUser1 + '/doctorAccount/modifyDoctorPassword',
    resetPwd: apiUser1 + '/doctorAccount/resetDoctorPassword',


};