export default class IsHelper {
  // var u = navigator.userAgent;
  // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  // alert('是否是Android：'+isAndroid);
  // alert('是否是iOS：'+isiOS);

  static isMobile() {
    const userAgentInfo = navigator.userAgent;
    const Agents = [
      'Android',
      'iPhone',
      'SymbianOS',
      'Windows Phone',
    ];
    let flag = false;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = true;
        break;
      }
    }
    return flag;
  }

  static isIpad() {
    const userAgentInfo = navigator.userAgent;
    const Agents = [
      'iPad',
      'iPod',
    ];
    let flag = false;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = true;
        break;
      }
    }
    return flag;
  }

  static isPC() {
    const userAgentInfo = navigator.userAgent;
    const Agents = [
      'Android',
      'iPhone',
      'SymbianOS',
      'Windows Phone',
      'iPad',
      'iPod',
    ];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }

  static isWeiXin() {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('micromessenger')) {
      return true;
    } else {
      return false;
    }
  }

  // 判断是否为手机号  
  static isPhoneNum(phone: string) {
    const phoneReg = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/;
    if (phoneReg.test(phone)) {
      return true;
    } else {
      return false;
    }
  }

  // 判断是否为合格的密码  
  static isQualifiedPassword(pwd: string) {
    const pattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#@*&.])[a-zA-Z\d!#@*&.]{8,}$/;
    if (pattern.test(pwd)) {
      return true;
    } else {
      return false;
    }
  }
}
