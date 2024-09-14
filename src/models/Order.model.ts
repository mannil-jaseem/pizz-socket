import { Schema, model } from 'mongoose';
import { customAlphabet } from 'nanoid';

export interface IOrder {
    ORDER_ID: string;
    USER_ID: string;
    DATE: Date;
    ITEMS: Array<{ MENU_ID: string, QUANTITY: number, PRICE: number, TOTAL: number }>;
    AMOUNT: number;
    STATUS: string;
}

const orderSchema = new Schema<IOrder>({
    ORDER_ID: { type: String },
    USER_ID: { type: String, required: true },
    DATE: { type: Date, default: Date.now },
    ITEMS: [{
        MENU_ID: { type: String, required: true },
        QUANTITY: { type: Number, required: true },
        PRICE: { type: Number, required: true },
        TOTAL: { type: Number, required: true },// quatity * price
    }],
    AMOUNT: { type: Number, required: true },
    STATUS: { type: String, required: true, enum:['Pending','In-progress','Completed'] }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    timestamps: {
        createdAt: "CREATED_AT",
        updatedAt: "UPDATED_AT"
    }
});

// Create unique index on order_id
orderSchema.index({ ORDER_ID: 1 }, { unique: true });

// Auto-generate order_id if not present
orderSchema.pre('save', function (next: any) {
    if (!this.ORDER_ID) {
        const ID = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)();
        this.ORDER_ID = `ORD${ID}`;
    }
    next();
});

const Order = model<IOrder>('Order', orderSchema, "Order");
export default Order;