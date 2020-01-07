'use strict'

const Router = require("express").Router();
const UserCtrl = require('../app/database/controllers/user');
const Jwt = require('../app/authentication/jwt')

Router.route('/')
    .get(async function(req, res) {
        try {

            res.json("server is ruuning successfully");

        } catch (err) {
            console.log("Error in /user post", err)
            res.status(400).json({ "message": "Problem in fetchng user" })

        }
    })


Router.route('/user/:id')
    .get(async function(req, res) {
        try {

            let response = await UserCtrl.getUserDataBId(req.params.id);
            res.status(200).json(response)


        } catch (err) {
            console.log("Error in /user post", err)
            res.status(400).json({ "message": "Problem in fetchng user" })

        }
    })

    .put(async function(req, res) {
        try {
            console.log("put called",req.headers)
            if (req.headers.authorization) {
                let token = req.headers.authorization.split(' ')[1]
                let payload = await Jwt.verifyToken(token)
                console.log("payload",payload)
                if (payload) {
                    let query = {};
                    if (req.body)
                        query = req.body
                    let response = await UserCtrl.updateUserData({ "_id": req.params.id }, query);
                    res.status(200).json(response)
                }
            } else {
                res.status(403).json({ "message": "Authorization token is missing. Add in headers." });

            }


        } catch (err) {
            console.log("Error in /user post", err)
            res.status(400).json({ "message": "Problem in updating user || Invalid authorization." })

        }
    })






Router.route('/register')
    .post(async function(req, res) {
        try {
            console.log("body", req.body)
            var data = {
                "email": req.body.email.toLowerCase()
            }

            let user = await UserCtrl.getUserData(data);

            if (user.length > 0) {
                res.json("email already exists");

            } else {
                let response = await UserCtrl.createUserData(req.body);
                res.status(200).json(response)

            }

        } catch (err) {
            console.log("Error in /register post", err)
            res.status(400).json({ "message": "Problem in creating user or the email/username already exists." })

        }
    })





Router.route('/login')
    .post(async function(req, res) {
        try {
            console.log("body", req.body)
            var data = {
                "email": req.body.email.toLowerCase(),
                "password": req.body.password
            }

            let response = await UserCtrl.getUserData(data);
            console.log("response", response)
            let payload = {
                token: response._id
            }
            let token = await Jwt.createToken(payload);
            console.log("token", token)

            response[0]["token"] = token;
            res.status(200).json(response)


        } catch (err) {
            console.log("Error in /login post", err)
            res.status(400).json({ "message": "Problem in Login." })

        }
    })





module.exports = Router