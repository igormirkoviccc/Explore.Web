const mongoose = require('mongoose');
const QuestionTypeEnum = require('../../enum/questiontype');



var QuestionSchema = new mongoose.Schema({
        type:{
            type:QuestionTypeEnum
        },
        text:String,
        possibleAnswers:[{
            id: { type: mongoose.Schema.Types.ObjectId },
            text:{ type:String },
            checked: { type: Number}
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

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question
