import MonitorPlugin from "./plugins/MonitorPlugin";
import BeanstalkMonitor from "./plugins/BeanstalkMonitorPlugin";
import Common from "./utils/Common";
import Observer from "./Observer";
import { EventEmitter } from "events";

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

    /** Default update duration of the service */
    private _updateDurationMs : number = 1000;

    /** List of registered observers for this service */
    private _observers : Array<Observer> = [];

    /**
     * Gets the singleton instance of the service
     */
    constructor(updateDuration: number) {
        if(updateDuration > 0) {
            this._updateDurationMs = updateDuration;
        }
    }

    /**
     * Registers an oberver for this service
     * @param observer The observer object to be registered 
     */
    registerObserver(observer : Observer) : void {
        this._observers.push(observer);
        console.log(`[${this._observers.length}]+ ${observer.name}`);
    }

    /**
     * Removes an observer from the list
     * @param observer The observer object to be registered 
     */
    removeObserver(observerName : string) : void {
        this._observers = this._observers.filter(function(value, index, arr) {
            return value.name != observerName;
        }); 
        console.log(`[${this._observers.length}]- ${observerName}`);
    }

    /**
     * Initialize service
     */
    init() : void {
        /** instantiate the plugins */
        this.plugins.push(
            new BeanstalkMonitor()
        );
        /** initialize the plugins */
        this.plugins.forEach( plugin => plugin.init());
        this._serviceState = "run";
    }

    /**
     * start processing
     */
    start() : void {
        setInterval(() => { 
            var result : Array<any> = this.plugins.map((plugin) => plugin.publish());
            this._observers.forEach(observer => observer.onDataHandler!(result, observer.context));
        }, this._updateDurationMs);
    }

    /**
     * stop processing
     */
    stop() : void {
        this._serviceState = "stop";
    }
}

export default Service;