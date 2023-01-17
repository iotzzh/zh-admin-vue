import { apiWH } from '@/api/config';

export default {
    // 诊室管理
    getDoctorAccountList: apiWH + '/doctorAccount/list', // 诊室管理列表
    addDoctorAccount: apiWH + '/doctorAccount/add',
    updateDoctorAccount: apiWH + '/doctorAccount/modify',
    deleteDoctorAccount: apiWH + '/doctorAccount/remove',
    batchDoctorAccount: apiWH + '/doctorAccount/remove',

    updatePwd: apiWH + '/doctorAccount/modifyDoctorPassword',
    resetPwd: apiWH + '/doctorAccount/resetDoctorPassword',


};