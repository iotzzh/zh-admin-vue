export default class WebSocketClass {
    url: string;
    protocols: string | null;
    ws: WebSocket | null;
    errorStack: Array<any>;
    isReconnectionLoading: boolean;
    isCustomClose: boolean;
    timeId: any;
    eventCenter: any;
    isConnection: boolean;
    // const WS = new Ws('ws://localhost:6050', 'echo-protocol')
    constructor(url:string, protocols:string|null) {
      this.url = url; // 要连接的URL
      this.protocols = protocols;
      this.ws = null; // WebSocket 实例
      this.errorStack = [];
      this.isReconnectionLoading = false; // 是否在重连中
      this.isCustomClose = false; // 是否是用户手动关闭连接
      this.timeId = null; // 延时重连的 id
      this.eventCenter = new EventCenter();
      this.isConnection = false;
      this.createWs();
    }
  
    createWs() {
      if ('WebSocket' in window) {
        try {
            this.protocols ? this.ws = new WebSocket(this.url, this.protocols) : this.ws = new WebSocket(this.url);
            // 监听事件
            this.onopen();
            this.onerror();
            this.onclose();
            this.onmessage();
            this.isConnection = true;
        } catch(e:any) {
            console.log('websocket 连接失败！');
        }
      } else {
        console.log('你的浏览器不支持 WebSocket');
      }
    }
  
    // 监听成功
    onopen() {
      if (!this.ws) return;
      
      this.ws.onopen = () => {
        console.log(this.ws, 'onopen');
        // 发送成功连接之前所发送失败的消息
        this.errorStack.forEach(message => {
          this.send(message);
        });
        this.errorStack = [];
        this.isReconnectionLoading = false;
      };
      console.log('opened');
    }
  
    // 监听错误
    onerror() {
      if (!this.ws) return;
      this.ws.onerror = (err:any):void => {
        this.isConnection = false;
        console.log(err, 'onerror');
        this.reconnection();
        this.isReconnectionLoading = false;
      };
    }
  
    // 监听关闭
    onclose() {
      if (!this.ws) return;
      this.ws.onclose = () => {
        console.log('onclose');
        this.isConnection = false;
        // 用户手动关闭的不重连
        if (this.isCustomClose) return;
  
        this.reconnection();
        this.isReconnectionLoading = false;
      };
    }
  
    // 接收 WebSocket 消息
    async onmessage() {
      if (!this.ws) return;
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.eventCenter.emit(data.type, data.data);
        } catch (error) {
          console.log(error, 'error');
        }
      };
    }
  
    // 重连
    reconnection() {
      // 防止重复
      if (this.isReconnectionLoading) return;
  
      this.isReconnectionLoading = true;
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.createWs();
      }, 3000);
    }
  
    // 发送消息
    send(message:string) {
      if (!this.ws) return;
      // 连接失败时的处理
      if (this.ws.readyState !== 1) {
        this.errorStack.push(message);
        return;
      }

      this.ws.send(message);
    }
  
    // 手动关闭
    close() {
      if (!this.ws) return;
      this.isConnection = true;
      this.isCustomClose = true;
      this.ws.close();
      console.log('closed');
    }
  
    // 手动开启
    start() {
      this.isCustomClose = false;
      this.reconnection();
    }
  
    // 订阅
    subscribe(eventName:string, cb:any) {
      this.eventCenter.on(eventName, cb);
    }
  
    // 取消订阅
    unsubscribe(eventName:string, cb:any) {
      this.eventCenter.off(eventName, cb);
    }
  
    // 销毁
    destroy() {
      this.close();
      this.ws = null;
      this.errorStack = [];
      this.eventCenter = null;
    }
  }

  class EventCenter {
    eventStack: {};  
    constructor() {
      this.eventStack = {}; // 通过事件类型作为属性来管理不通的事件回调
    }
  
    on(eventName:string, cb:any) {
      const { eventStack } = this;
      const eventValue = eventStack[eventName];
  
      eventValue ? eventValue.push(cb) : eventStack[eventName] = [cb];
    }
  
    once(eventName:string, cb:any) {
      const { eventStack } = this;
      const eventValue = eventStack[eventName];
      // 利用闭包的形式 来模拟一次性监听的功能函数
      const tempCb = () => {
        let isOutOfDate = false;
  
        return () => {
          if (isOutOfDate) return;
          cb();
          isOutOfDate = true;
        };
      };
  
      eventValue ? eventValue.push(tempCb()) : eventStack[eventName] = [tempCb()];
    }
  
    off(eventName:string, cb:any) {
      const { eventStack } = this;
      const eventValue = eventStack[eventName];
  
      if (!eventValue) return;
  
      (eventValue || []).forEach((eventCb:any, index:any) => {
        if (eventCb === cb) {
          eventValue.splice(index, 1);
        }
      });
    }
  
    emit(eventName:any, data:any) {
      const { eventStack } = this;
      const eventValue = eventStack[eventName];
      if (!eventValue) return;
      (eventValue || []).forEach((eventCb:any) => {
        eventCb(data);
      });
    }
  }

