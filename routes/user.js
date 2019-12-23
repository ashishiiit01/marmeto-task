'use strict'

const Router = require("express").Router();
const UserCtrl = require('../app/database/controllers/user');



Router.route('/user/:id')
         .get(async function (req, res) {
        try {
            
            let response = await UserCtrl.getUserDataBId(req.params.id);
            res.json(response);
        
        } catch (err) {
            console.log("Error in /user post", err)
            res.status(400).json({ "message": "Problem in fetchng user" })
            
        }
    })

       .put(async function (req, res) {
        try {
            console.log("put called",req.params.id,"query",req.body)
            let query = {};
            if(req.body)
                query = req.body
            let response = await UserCtrl.updateUserData({"_id":req.params.id},query);
            res.json(response);
        
        } catch (err) {
            console.log("Error in /user post", err)
            res.status(400).json({ "message": "Problem in updating user." })
            
        }
    })

      .delete(async function (req, res) {
        try {
            console.log("req.params.id",req.params)
            let response = await UserCtrl.deleteUserData({"_id":req.params.id});
            res.json(response);
        
        } catch (err) {
            console.log("Error in /user post", err)
            res.status(400).json({ "message": "Problem in deleting user." })
            
        }
    })




Router.route('/user')
    .post(async function (req, res) {
        try {
            console.log("body", req.body)
            let response = await UserCtrl.createUserData(req.body);
            res.json(response);
        
        } catch (err) {
            console.log("Error in /user post", err)
            res.status(400).json({ "message": "Problem in creating user or the email/username already exists." })
            
        }
    })

    .get(async function (req, res) {
        try {
            let query = {};
            if(req.params)
                query = req.query
            let response = await UserCtrl.getUserData(query);
            res.json(response);
        
        } catch (err) {
            console.log("Error in /user post", err)
            res.status(400).json({ "message": "Problem in fetching user Details." })
            
        }
    })

   


    
module.exports = Router


