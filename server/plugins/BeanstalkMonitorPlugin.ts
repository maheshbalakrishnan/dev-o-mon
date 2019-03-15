import MonitorPlugin from "./MonitorPlugin";
var bs = require('nodestalker')

class BeanstalkMonitor implements MonitorPlugin {
  
  name: string = "BeanstalkMonitor";

  init(): void {
  }

  publish() {
    return {
      identifier: "RIP1",
      metrics: [
          {
              type: "beanstalkMonitor",
              data: {
                  queues: [
                      {
                          name: "send",
                          messageCount: 12
                      },
                      {
                          name: "chunk",
                          messageCount: 24
                      },
                      {
                          name: "delete",
                          messageCount: 4
                      }
                  ]
              }
          },
          {
              type: "resourceMonitor",
              data: {
                  resources: [
                      {
                          name: "CPUUsage",
                          usagePercentage: 578
                      },
                      {
                          name: "MemoryUsage",
                          usagePercentage: 48
                      },
                      {
                          name: "SharedMemoryUsage",
                          usagePercentage: 17
                      },
                      {
                          name: "DiskUsage",
                          usagePercentage: 7
                      }
                  ]
              }
          },
          {
              type: "logMonitor",
              data: {
                  alerts: [
                      {
                          name: "errors",
                          count: 4
                      },
                      {
                          name: "warnings",
                          count: 0
                      }
                  ]
              }
          },
          {
              type: "reuseCacheMonitor",
              data: {
                  reuseJobs: [
                      {
                          jobId: 4,
                          objectCount: 487,
                          ripped: 77,
                          reused: 44
                      }
                  ]
              }
          }
      ]
    }
    
  }

  private client: any;

  BeanstalkMonitor() {
    this.client = bs.Client('127.0.0.1:11300');
  }
}

export default BeanstalkMonitor;