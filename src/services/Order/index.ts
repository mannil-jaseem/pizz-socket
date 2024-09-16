import { Socket } from "socket.io";
import MongoCRUD from "../../CRUD/mongo";
import { Preperation } from "../Preperation";
import pc from "picocolors";

export default class Order {
    private mongo: MongoCRUD
    constructor() {
        this.mongo = new MongoCRUD()
    }
    // public async cookingCompletion(orderId: string) {
    //     // uodate completed
    //     let order = await this.mongo.updateOne('Order', { f: { ORDER_ID: orderId }, u: { $inc: { COMPLETED: 1 } } })
    //     if (!order?.ORDER_ID) return { status: 201, data: { message: 'something went wrong' } }
    //     // if completed == total make order complete 
    //     if (order?.COMPLETED == order.TOTAL_ITEMS) {
    //         let statusUpdate = await this.mongo.updateOne('Order', { f: { ORDER_ID: orderId }, u: { STATUS: "Completed" } })
    //         if (!statusUpdate.ORDER_ID) return { status: 201, data: { message: 'something went wrong' } }
    //         // sent event to show completed
    //     }
    //     // if unassign == 0 take next order
    //     if (order?.UNASSIGNED) {
    //         let newOrder = await this.mongo.findOne('Order', { ORDER_ID: { $ne: orderId } }, { TIMESTAMP: 1 })
    //         if (!newOrder.ORDER_ID) return { status: 201, data: { message: 'something went wrong' } }
    //         // update unassign
    //     }

    // }
    public async getPreperationTime(orderId: string) {
        let order = await this.mongo.aggregate('Order', { ORDER_ID: { $ne: orderId } }, 'getOrderItems')
        if (!order.length && order[0].ORDER_ID) return { status: 201, data: { message: 'something went wrong' } }
        let time = await new Preperation().getFoodprepTime(order[0])
        return { status: 200, data: time }

    }
    public async orderConfirmation(socket: any, orderId: string) {
        let io = socket
        let order = await this.mongo.aggregate('Order', { ORDER_ID: { $ne: orderId } }, 'getOrderItems')
        if (!order.length && order[0].ORDER_ID) return { status: 201, data: { message: 'something went wrong' } }
        let time = await new Preperation().getFoodprepTime(order[0])
        let emit = io.emit('ORDER_PLACED', { payload: "hiii" })
        if (emit) console.log('Event emitted :Order placed');
        else console.log(pc.red('event emit Error') + ' :Order placed');
        return { status: 200, data: { prep_time: time } }
    }
}