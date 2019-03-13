import MonitorPlugin from "./MonitorPlugin";
var bs = require('nodestalker')

class BeanstalkMonitor implements MonitorPlugin {
  
  name: string = "BeanstalkMonitor";

  init(): void {
  }

  publish() {
    return {
      result: "data"
    }
  }

  private client: any;

  BeanstalkMonitor() {
    this.client = bs.Client('127.0.0.1:11300');
  }
}

export default BeanstalkMonitor;