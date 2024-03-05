import { IUser } from "../types";
 
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOSTRING)
    .then(() => console.log('Connected!'));

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    createdAt: String,
    updateAt: String
});

const User = mongoose.model('User', userSchema, 'Users');

async function getUser(username: string): Promise<IUser | null> {
    try {
        const user = await User.find({ username: { $eq: username } });
        if (user && user.length > 0) {
            return user[0] as IUser;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function postUser(username: string, password: string, createdAt: string, updateAt: string): Promise<boolean | null> {
    try {
        const user = new User({
            username: username,
            password: password,
            createdAt: createdAt,
            updateAt: updateAt
        });
        await user.save();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function changePassword(username: string, newPassword: string, updateAt: string): Promise<IUser | null> {
    try {
        const user = await User.updateOne({ username: { $eq: username } }, {$set:{password: newPassword, updateAt: updateAt}});
        if (user && user.length > 0) {
            return user[0] as IUser;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    getUser,
    postUser,
    changePassword
}