import MonitorPlugin from "./plugins/MonitorPlugin";
import BeanstalkMonitor from "./plugins/BeanstalkMonitorPlugin";
import Common from "./utils/Common";

/**
 * Singleton class to watch and aggregate all the plugin
 * data and publishes them
 */
class Service {

    /** All plugins that the service has to monitor */
    plugins: Array<MonitorPlugin> = [];

    /** Singleton instance of the service */
    private static _instance : Service | null = null;

    /** control variable for this service */
    private _serviceState : string = "stop";

    private _onDataCallback : Function = function(data : any) {
        console.log(data);
    };

    /** Default update duration of the service */
    private static UPDATE_DURATION_MS = 1000; 

    private _updateDuration : number = Service.UPDATE_DURATION_MS;

    /**
     * Gets the singleton instance of the service
     */
    constructor(updateDuration: number, onDataCallback: Function | null) {
        
        if(updateDuration > 0) {
            this._updateDuration = updateDuration;
        }

        if(onDataCallback !== null) {
            this._onDataCallback = onDataCallback;
        }
    }

    /**
     * Initialize service
     */
    init() : boolean {
        
        var result = true;
        
        /** instantiate the plugins */
        this.plugins.push(
            new BeanstalkMonitor()
        );

        /** initialize the plugins */
        this.plugins.forEach( plugin => plugin.init());

        this._serviceState = "run";

        return result;

    }

    /**
     * start processing
     */
    start() : void {

        do {
            
            var result : Array<any> = this.plugins.map((plugin) => plugin.publish());

            this._onDataCallback(result);

            Common.sleep(this._updateDuration);
        
        } while(this._serviceState === "run");

    }

    /**
     * stop processing
     */
    stop() : void {

        this._serviceState = "stop";
    
    }
}

export default Service;