const mongoose = require('mongoose');



var ExplorationSchema = new mongoose.Schema({
    // required: true
        name: {
            type: String,
        },
        coordinator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        img:{
            type: String,
            // required: true,
            default: "https://picsum.photos/200"
        },
        beginDate: {
            type: Date
        },
        endDate: {
            type: Date,
            // validate(value){
            //     if(value < this.beginDate){
            //         throw new Error("Dates not good");
            //     }
            // }
        },
        participants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
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

const Exploration = mongoose.model('Exploration', ExplorationSchema);

module.exports = Exploration
