const mongoose = require("mongoose");

const shipsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: {
                true: 'Please provide a name for this ship!'
            },
            minlength: 6,
            unique: true
        },
        location: {
            type: mongoose.Schema.ObjectId,
            default: 1,
        }
    },
    {timestamps: true}
);

const shipsModel = mongoose.model(
    "Ships", 
    shipsSchema
);

module.exports = shipsModel;