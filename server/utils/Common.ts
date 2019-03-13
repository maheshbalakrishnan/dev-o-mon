class Common {
    public static sleep(ms : number){
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }
}

export default Common;