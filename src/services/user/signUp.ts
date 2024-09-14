import MongoCRUD from "../../CRUD/mongo";

export class SignUp {
    private mongo
    constructor(){
        this.mongo = new MongoCRUD()
    }
    public async init(doc:any) {
        let a = await this.mongo.save('Users',doc)
        console.log(a);
        // let a = await this.mongo.findOne('Users',{})
        // console.log(a);
    }
}