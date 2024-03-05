import { IUser } from "../types";

const usuarios = require('../database/users');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

function generateAccessToken(username: string) {
    return jwt.sign({ username: username }, process.env.SECRET, { expiresIn: '1h' });
}

const registerUser = async (username: string, password: string) => {
    try {     
        const existingUser: IUser = await usuarios.getUser(username); 
        if (existingUser) {
            return { status: 400, message: "The user is already registered." };
        } else {     
            const uruguayTime = moment().tz('America/Montevideo').format("YYYY-MM-DDTHH:mm:ss.SSSZ");            
            await usuarios.postUser(username, password, uruguayTime, uruguayTime);
            const token = generateAccessToken(username);
            return { status: 200, token: token };
        }
    } catch (error) {
        throw new Error("Error in the service when processing the request.");
    }
}

const loginUser = async (username: string, password: string) => {
    try {
        const existingUser: IUser = await usuarios.getUser(username);
        if (!existingUser) {
            return { status: 400, message: "The user is not registered." };
        } else {
            if (existingUser.password != password) {
                return { status: 400, message: "Incorrect password." };
            } else {
                const token = generateAccessToken(username);
                return { status: 200, token: token };
            }
        }
    } catch (error) {
        throw new Error("Error in the service when processing the request.");
    }
}

const changePassword = async (username: string, password: string, newPassword: string) => {
    try {
        const existingUser: IUser = await usuarios.getUser(username);
        if (!existingUser) {
            return { status: 400, message: "Incorrect username." };
        } else {
            if (existingUser.password != password) {
                return { status: 400, message: "Incorrect password." };
            } else {
                const uruguayTime = moment().tz('America/Montevideo').format("YYYY-MM-DDTHH:mm:ss.SSSZ");            
                await usuarios.changePassword(username, newPassword, uruguayTime);
                return { status: 200, message: "The password was changed." };
            }
        }
    } catch (error) {
        throw new Error("Error in the service when processing the request.");
    }
}

module.exports = {
    registerUser,
    loginUser,
    changePassword
}