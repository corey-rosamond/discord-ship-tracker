const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: {
                true: 'Please provide a name for this location!'
            },
            minlength: 3,
            unique: true
        },
        zone: {
            type: Number,
            default: 1,
        }
    },
    { timestamps: true }
);

const locationsModel = mongoose.model(
    "locations",
    locationsSchema
);

module.exports = locationsModel;