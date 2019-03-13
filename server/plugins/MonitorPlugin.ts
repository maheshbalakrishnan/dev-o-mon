interface MonitorPlugin {
    /** Name of this plugin */
    name: string;

    /** Initializes necessary dependencies */
    init() : void;

    /** Publishes the data */
    publish() : any;
}


export default MonitorPlugin;