import { Schema, model } from 'mongoose';

const accountSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

const AccountModel = model('Account', accountSchema);

export default AccountModel;