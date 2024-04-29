import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email Already Exists'],
        required: [true, 'Email is Required']
    },
    username: {
        type: String,
        required: [true, 'Username is Required']
    },
    image: {
        type: String
    },
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property',
        },
    ],
} 
, {
        timestamps: true
    })

const User = models.User || model('User', UserSchema)
export default User;