const mongoose = require("mongoose");

const zonesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: {
                true: 'Please provide a name for this zone!'
            },
            unique: true
        }
    },
    { timestamps: true }
);

const zonesModel = mongoose.model(
    "zones",
    zonesSchema
);

module.exports = zonesModel;