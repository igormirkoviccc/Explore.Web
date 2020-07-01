const mongoose = require('mongoose');
import QuestionTypeEnum from '../../enum/questiontype';



var Questions = new mongoose.Schema({
        stat: {
            correct: Number,
            notCorrect: Number,
        },
        type:{
            type:QuestionTypeEnum
        },
        text:String,
        possibleAnswers:[{
            text:{
                type:String,
                required: true
            },
            stat:{
                checked: Number,
                required: true
            }
        }]
    },{
        timestamps: true
    }
);


// ExplorationSchema.pre('validate', function(next) {
//     if (this.beginDate > this.endDate) {
//         next(new Error('End Date must be greater than Start Date'))
//     } else {
//         next()
//     }
// })

const Questions = mongoose.model('Questions', Questions);

module.exports = Questions
