// 验证是否是手机号
<<<<<<< HEAD
export const validatePhone = function(mobile:(number | string)): boolean {
=======
const validatePhone = function (mobile: (number | string)): boolean {
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
    if (!mobile) return false;
    const pattern = /^1[3456789]\d{9}$/;
    return pattern.test(mobile.toString());
};

<<<<<<< HEAD

// // 验证是否是手机号
// export const validatePhone = function (mobile) {
//     if (!mobile) { return false; }
// 	let pattern = /^1[3456789]\d{9}$/;
// 	return pattern.test(mobile);
// }

// // 验证是否是身份证号
// export const validateIDCard = function (num) {
//     num = num.toUpperCase();
//     //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
//     if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
//         // alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
//         return false;
//     }
//     //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
//     //下面分别分析出生日期和校验位 
//     var len, re;
//     len = num.length;
//     if (len == 15) {
//         re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
//         var arrSplit = num.match(re);

//         //检查生日日期是否正确 
//         var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
//         var bGoodDay;
//         bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
//         if (!bGoodDay) {
//             // alert('输入的身份证号里出生日期不对！');
//             return false;
//         }
//         else {
//             //将15位身份证转成18位 
//             //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
//             var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
//             var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
//             var nTemp = 0, i;
//             num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
//             for (i = 0; i < 17; i++) {
//                 nTemp += num.substr(i, 1) * arrInt[i];
//             }
//             num += arrCh[nTemp % 11];
//             return true;
//         }
//     }
//     if (len == 18) {
//         re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
//         var arrSplit = num.match(re);

//         //检查生日日期是否正确 
//         var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
//         var bGoodDay;
//         bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
//         if (!bGoodDay) {
//            // alert(dtmBirth.getYear());
//           //  alert(arrSplit[2]);
//             // alert('输入的身份证号里出生日期不对！');
//             return false;
//         }
//         else {
//             //检验18位身份证的校验码是否正确。 
//             //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
//             var valnum;
//             var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
//             var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
//             var nTemp = 0, i;
//             for (i = 0; i < 17; i++) {
//                 nTemp += num.substr(i, 1) * arrInt[i];
//             }
//             valnum = arrCh[nTemp % 11];
//             if (valnum != num.substr(17, 1)) {
//                 // alert('18位身份证的校验码不正确！'); //应该为： + valnum
//                 return false;
//             }
//             return true;
//         }
//     }
//     return false;
// }
=======
// 验证是否是身份证号
const validateIDCard = function (idCard: string) {
    // areaCode:地区码  checkCode：最后一位的校验码
    const areaCode = [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91];
    const checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    if (idCard.length === 15) {               // 如果是15位的身份证号码
        // 判断地区码
        const idCardAreaCode = parseInt(idCard.substr(0, 2));
        if (areaCode.indexOf(idCardAreaCode) === -1) {
            return false;
        }

        // 判断时间
        const borthYear = parseInt(idCard.substr(6, 2)) + 1900;
        const isRunNian = (borthYear % 400 === 0) || (borthYear % 100 !== 0 && borthYear % 4 === 0);
        let regStr = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
        if (isRunNian) {
            regStr = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
        }
        if (!idCard.match(regStr)) {
            return false;
        }

        return true;
    } else if (idCard.length === 18) {        // 如果是18位的身份证号码

        // 判断地区码
        const idCardAreaCode = parseInt(idCard.substr(0, 2));
        if (areaCode.indexOf(idCardAreaCode) === -1) {
            return false;
        }

        // 判断时间
        const borthYear = parseInt(idCard.substr(6, 4));
        const isRunNian = (borthYear % 400 === 0) || (borthYear % 100 !== 0 && borthYear % 4 === 0);
        let regStr = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
        if (isRunNian) {
            regStr = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
        }
        if (!idCard.match(regStr)) {
            return false;
        }

        // 判断最后一位---校验码
        const sumIdCard = (parseInt(idCard.substr(0, 1)) + parseInt(idCard.substr(10, 1))) * 7 +
            (parseInt(idCard.substr(1, 1)) + parseInt(idCard.substr(11, 1))) * 9 +
            (parseInt(idCard.substr(2, 1)) + parseInt(idCard.substr(12, 1))) * 10 +
            (parseInt(idCard.substr(3, 1)) + parseInt(idCard.substr(13, 1))) * 5 +
            (parseInt(idCard.substr(4, 1)) + parseInt(idCard.substr(14, 1))) * 8 +
            (parseInt(idCard.substr(5, 1)) + parseInt(idCard.substr(15, 1))) * 4 +
            (parseInt(idCard.substr(6, 1)) + parseInt(idCard.substr(16, 1))) * 2 +
            parseInt(idCard.substr(7, 1)) * 1 + parseInt(idCard.substr(8, 1)) * 6 +
            parseInt(idCard.substr(9, 1)) * 3;
        const modNum = checkCode[sumIdCard % 11];
        if (modNum !== idCard.substr(17, 1).toUpperCase()) {
            return false;
        }

        return true;
    } else {
        return false;
    }
};

export {
    validatePhone, // 验证是否是手机号
    validateIDCard, // 验证是否是身份证号
};
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
