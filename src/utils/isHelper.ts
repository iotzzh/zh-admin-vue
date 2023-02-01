export default class isHelper {
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
}