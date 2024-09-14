import main_db from "../models"

export default class MongoCRUD {
    private db: any
    constructor() {
        this.db = main_db
    }
    public async save(model: keyof typeof main_db, data: object) {
        let result = await this.db[model].create(data)
        let a = result.toJSON()
        return a
    }
    public async findOne(model: keyof typeof main_db, filter: typeof main_db) {
        let result = await this.db[model].findOne(filter)
        return result
    }
    public async findMany(model: keyof typeof main_db, data: object) {
        let result = await this.db[model].create(data)
        return result
    }
}