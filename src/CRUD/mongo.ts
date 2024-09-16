import main_db from "../models"

type IUpdate = {
    f: Object,
    u: Object
}

let aggregations:any = {
    getOrderItems:[
        { $match: { ORDER_ID: "ORDER005" } },
        { $unwind: "$ITEMS" },
        {
            $lookup: {
                from: "Menu",
                localField: "ITEMS.MENU_ID",
                foreignField: "MENU_ID",
                as: "menu"
            }
        },
        {
            $unwind: "$menu"
        },
        {
            $group: {
                _id: "$ORDER_ID",
                ORDER_ID: { $first: "$ORDER_ID" },
                USER_ID: { $first: "$USER_ID" },
                ITEMS: {
                    $push: {
                        MENU_ID: "$ITEMS.MENU_ID",
                        QUANTITY: "$ITEMS.QUANTITY",
                        PRICE: "$ITEMS.PRICE",
                        TOTAL: "$ITEMS.TOTAL",
                        TYPE: "$menu.TYPE"
                    }
                }
            }
        },
        { $project: { _id: 0 } }
    ]
}

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
    public async findOne(model: keyof typeof main_db, filter: object, sort:object = {}) {
        let result = await this.db[model].findOne(filter).sort(sort)
        return result.toJSON()
    }
    public async findMany(model: keyof typeof main_db, data: object) {
        let result = await this.db[model].create(data)
        return result
    }
    public async aggregate(model: keyof typeof main_db, _data: object, agg:string) {
        let result = await this.db[model].aggregate(aggregations[agg])
        return result
    }
    public async updateOne(model: keyof typeof main_db, data: IUpdate) {
        try {
            let { f, u } = data
            let result = await this.db[model].findOneAndUpdate(f, u, { new: true, runValidators: true })
            return result.toJSON()
        } catch (error) {
            console.log(error);
        }
    }
}