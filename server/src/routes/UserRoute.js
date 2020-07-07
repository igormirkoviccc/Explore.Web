const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../db/models/User')
const Exploration = require('../db/models/Exploration')
const UserRoute = express.Router()
const Auth = require('../middleware/auth');

UserRoute.post('/signup', async (req, res) =>{
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = new User({...req.body, password: hashedPassword});
    await user.save((err,success) =>{
        if(err){
            res.send(err);
        }
        res.send(success);
    });
})

UserRoute.post('/login', async (req, res) =>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.send({token: await user.generateAuthToken(), id: user._id, role: user.role});
    }catch (e) {
        res.status(400).send({error: "Login failed"});
    }
})

UserRoute.get('/users', Auth.verifyUserToken, (req, res) =>{
    User.find().exec(function (err,docs) {
        if(err){
            res.send(err);
            throw err;
        }
        res.send(docs);
    })
})

UserRoute.get('/user/:id', Auth.verifyUserToken, Auth.verifyAdmin, (req, res) =>{
    User.findById(req.params.id).exec(function (err,docs) {
        if(err){
            res.send(err);
            throw err;
        }
        res.send(docs);
    })
})

UserRoute.post('/adduser', async (req, res) =>{
    const user = new User(req.body.user);
    await user.save(function(err, doc){
        if(err){
            res.send(err);
            throw err;
        }
        res.send(doc);
    })
})

UserRoute.post('/edituser', async (req, res) =>{
    await User.findOneAndUpdate({_id: req.body.user._id}, req.body.user, {new: true}, (err,doc) =>{
        if(err){
            res.send(err);
            throw err;
        }
        res.send(doc);
    })
})

UserRoute.get('/usersdelete/:id', Auth.verifyUserToken, Auth.verifyAdmin, async (req,res) =>{
    const exploration = await Exploration.find({coordinator: req.params.id});
    if(exploration){
        res.send({err: "Remove relations."})
        throw new Error("Remove relations.")
    }
    User.findByIdAndRemove(req.params.id).exec(function(err,docs){
        if(err){
            res.send(err);
            throw err;
        }
        res.send(docs);
    })
})



module.exports = UserRoute;
