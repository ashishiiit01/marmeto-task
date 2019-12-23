"use strict";

const User = require("../models/user");

function createUserData(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = new User(data);
            let res = await user.save();
            resolve(res);
        } catch (err) {
            reject(err);
        }
    });
}

function getUserData(query = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.find(query)
            resolve(users);
        } catch (err) {
            reject(err);
        }
    });
}

function getUserDataBId(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(userId)
            resolve(user);
        } catch (err) {
            reject(err);
        }
    });
}


//
function deleteUserData(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.deleteOne(query)
            resolve(users);
        } catch (err) {
            reject(err);
        }
    });
}

function updateUserData(data, query = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.findOneAndUpdate(data, { $set: query }, { new: true })
            resolve(users);
        } catch (err) {
            reject(err);
        }
    });
}
module.exports = {
    createUserData,
    getUserData,
    deleteUserData,
    updateUserData,
    getUserDataBId
};