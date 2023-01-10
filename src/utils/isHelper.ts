export default class isHelper {
  static isMobile() {
    const userAgentInfo = navigator.userAgent;
    const Agents = [
      'Android',
      'iPhone',
      'SymbianOS',
      'Windows Phone',
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

  static isWeiXin() {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('micromessenger')) {
      return true;
    } else {
      return false;
    }
  }
}
