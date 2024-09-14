import { Schema, model } from 'mongoose';
import { customAlphabet } from 'nanoid'

export interface IUser {
    USER_ID: string,
    FIRST_NAME: string,
    LAST_NAME: string,
    EMAIL: string,
    PASSWORD: string,
    PHONE_NO: string
}

const userSchema = new Schema<IUser>({
    USER_ID: { type: String },
    FIRST_NAME: { type: String, required: true },
    LAST_NAME: { type: String, required: true },
    EMAIL: { type: String, required: true },
    PASSWORD: { type: String, required: true },
    PHONE_NO: { type: String, required: true }
},{
    versionKey:false,
    toJSON: { virtuals: true },
    timestamps: {
        createdAt: "CREATED_AT",
        updatedAt: "UPDATED_AT"
    }
});

userSchema.index({USER_ID:1},{unique:true})
userSchema.pre('save', function (next: any) {
    if (!this.USER_ID) {
        const ID = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)()
        this.USER_ID = `USR${ID}`
    }
    next()
})

const Users = model<IUser>('Users', userSchema,"Users");
export default Users