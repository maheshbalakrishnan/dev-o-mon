import MonitorPlugin from "./MonitorPlugin";
var bs = require('nodestalker')

class BeanstalkMonitor implements MonitorPlugin {
  
  name: string = "BeanstalkMonitor";

  init(): void {
    throw new Error("Method not implemented.");
  }

  publish() {
    throw new Error("Method not implemented.");
  }

  private client: any;

  BeanstalkMonitor() {
    this.client = bs.Client('127.0.0.1:11300');
  }
  
  public monitor() : any {
    return {
      result: "data"
    }
  }
}

export default BeanstalkMonitor;