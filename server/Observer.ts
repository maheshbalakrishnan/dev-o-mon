class Observer {

    /** Name of this observer */
    public name : string | undefined;

    /** Context that needs to be passed when data is available */
    public context : any | undefined;

    /** The handler that needs to be called when data is available */
    public onDataHandler : Function | undefined;

    constructor(name : string, context : any, onDataHandler : Function) {
        this.name = name;
        this.context = context;
        this.onDataHandler = onDataHandler;
    }
}

export default Observer;