class Http {
    constructor() {
        
        this.GET=(url)=> {
            return { method: 'get', url };
        }

        this.POST=(url)=> {
            return { method: 'POST', url };
        }
    }
    
}

class Api extends Http {

    constructor(apis = []) {
        super();
        console.log(this)
        this.apis = apis
        Api.prototype._demo=()=>{
            return {a:1}
        }
        console.log(apis);
    }

    deme() {
        console.log('x')
        // return this.GET('api/deme')
        return {}
    }

}


const Servers = new Api([]);

export default Servers;
