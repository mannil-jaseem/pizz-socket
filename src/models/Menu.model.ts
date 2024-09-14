import { Schema, model } from 'mongoose';
import { customAlphabet } from 'nanoid';

export interface IMenu {
    MENU_ID: string;
    MENU_NAME: string;
    DESCRIPTION: string;
    PRICE: number;
    SIZE: string;
    STATUS: boolean;
    TYPE: string;
    IMAGE: string;
}

const menuSchema = new Schema<IMenu>({
    MENU_ID: { type: String },
    MENU_NAME: { type: String, required: true },
    DESCRIPTION: { type: String, required: true },
    PRICE: { type: Number, required: true },
    SIZE: { type: String, required: true ,enum:['Small','Medium','Large']},
    STATUS: { type: Boolean, required: true },
    TYPE: { type: String, required: true, enum:['Food','Drink'] },
    IMAGE: { type: String }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    timestamps: {
        createdAt: "CREATED_AT",
        updatedAt: "UPDATED_AT"
    }
});

// Create unique index on menu_id
menuSchema.index({ MENU_ID: 1 }, { unique: true });

// Auto-generate menu_id if not present
menuSchema.pre('save', function (next: any) {
    if (!this.MENU_ID) {
        const ID = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)();
        this.MENU_ID = `MENU${ID}`;
    }
    next();
});

const Menu = model<IMenu>('Menu', menuSchema, "Menu");
export default Menu;
