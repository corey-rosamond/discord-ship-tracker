const LocationModel = require("../models/locationsModel");

class Locations
{
    static async list(message, args)
    {
        try
        {
            let locations = await LocationModel.find();
            let messageContent = "";
            locations.map(location=>{ 
                messageContent += "Name: " + location.name + "\tZone: " + location.zone + "\n"; 
            });
            message.reply(messageContent);
        } catch(error)
        { 
            console.log(error.message); 
        }
    }

    static async add(message, args)
    {
        try
        {
            const name = args[1].toLowerCase();
            let zone = 1;
            let location = await LocationModel.create({name, zone});
            message.reply(`${name} was added in zone: ${zone}`)
        } catch(error)
        {
            console.log(error);
        }
    }

    static async remove(message, args)
    {
        try
        {
            const name = args[1].toLowerCase();
            let location = await LocationModel.findOne({name: name});
            console.log(location._id)
            await LocationModel.remove({_id: location._id});
            console.log(location.name);
            message.reply(`${location.name} removed!`);
        } catch(error)
        {
            console.log(error);
        }
    }
}

module.exports = Locations;