var express = require('express')

const ExplorationRoute = express.Router()
const Exploration = require('../db/models/Exploration')
const User = require('../db/models/User')
const Question = require('../db/models/Questions')


ExplorationRoute.get('/explorations', (req, res) =>{
    Exploration.find({}).populate('coordinator').populate('participants').exec(function (err, docs) {
        res.send(docs)
    })
})

ExplorationRoute.get('/exploration/:id', (req, res) =>{
    Exploration.findById(req.params.id).populate('coordinator').populate('participants').exec(function (err, docs) {
        res.send(docs)
    })
})

ExplorationRoute.post('/addexploration', async (req, res) =>{
    const exploration = new Exploration(req.body.exploration);
    await exploration.save(function(err, doc){
        if(err){
            res.send(err);
            throw err;
        }
        res.send(doc);
    })
})

ExplorationRoute.post('/editexploration', async (req, res) =>{
     await Exploration.findOneAndUpdate({_id: req.body.exploration._id}, req.body.exploration, {new: true}, (err,doc) =>{
         if(err){
             res.send(err);
             throw err;
         }
         res.send(doc);
     })
})

ExplorationRoute.get('/explorationsdelete/:id', async (req,res) =>{
    const exploration = await Exploration.findById(req.params.id);

    const user = await User.findById(exploration.coordinator);
    if(user){
        res.status(500).send('Remove relations!')
        throw new Error("Remove relations");
    }

    Exploration.findByIdAndRemove(req.params.id).exec(function(err,docs){
        if(err){
            res.send(err);
            throw err;
        }
        res.send(docs);
    })
})

ExplorationRoute.post('/add_canvas/:id', async (req,res) =>{
    const exploration = await Exploration.findById( req.params.id );
    const questions = req.body.questions;
    await questions.forEach(async (question) =>{
        const questionM = new Question({...question});
        const q = await questionM.save();
        await exploration.update({$push:{questions : q}});
    });

    if(exploration) res.send(exploration)
});

module.exports = ExplorationRoute;
