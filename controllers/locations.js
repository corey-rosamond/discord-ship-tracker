const LocationModel = require("../models/locationsModel");
const ReplyMessage  = require("../replyMessage");

class Locations
{
    static async list(message, command)
    {
        try
        {
            let locations = await LocationModel.find();
            let replyMessage = new ReplyMessage();
            locations.map(location=>{ 
                replyMessage.addLine("Name: " + location.name + "\tZone: " + location.zone);
            });
            message.reply(replyMessage.get());
        } catch(error)
        { 
            console.log(error.message); 
        }
    }

    static async add(message, command)
    {
        try
        {
            let location = await LocationModel.create({
                name: command.name, 
                zone: command.zone
            });
            let replyMessage = new ReplyMessage(`${command.name} was added in zone: ${command.zone}`);
            message.reply(replyMessage.get());
        } catch(error)
        {
            console.log(error);
        }
    }

    static async remove(message, command)
    {
        try
        {
            let location = await LocationModel.findOne({
                name: command.name
            });
            await LocationModel.remove({
                _id: location._id
            });
            let replyMessage = new ReplyMessage(`${location.name} removed!`);
            message.reply(replyMessage.get());
        } catch(error)
        {
            console.log(error);
        }
    }
}

module.exports = Locations;