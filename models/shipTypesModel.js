const mongoose = require("mongoose");

const shipTypesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: {
                true: 'Please provide a name for this ship type!'
            },
            minlength: 3,
            unique: true
        }
    },
    { timestamps: true }
);

const shipTypesModel = mongoose.model(
    "shipTypes",
    shipTypesSchema
);

module.exports = shipTypesModel;