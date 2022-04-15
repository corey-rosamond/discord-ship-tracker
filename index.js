
const dotenv = require("dotenv");
dotenv.config({path: ".env"});

const Database      = require("./configuration/database.js");

const Locations     = require("./controllers/locations");
const Ships         = require("./controllers/ships");
const ShipTypes     = require("./controllers/shipTypes");
const Zones         = require("./controllers/zones");
const Help          = require("./controllers/help");

const ReplyMessage  = require("./replyMessage.js");
const Command       = require("./command.js");

const Discord       = require("discord.js");

Database.connect(); 

const client = new Discord.Client({
    intents: [
        "GUILDS", 
        "GUILD_MESSAGES"
    ]
});

const prefix = "!";     

client.on("messageCreate", function(message){
    // If a bot sent the message ignore it.
    if(message.author.bot)
    {
        return;
    }
    // If the message is not a command ignore it.
    if(!message.content.startsWith(prefix))
    {
        return;
    }

    const command = new Command(message);

    switch(command.get())
    {
        case "add":
            switch(command.type)
            {
                // Add a ship
                case "ship":        Ships.add(message, command);                        break;
                // Add Ship type
                case "shiptype":    ShipTypes.add(message, command);                    break;
                // Add a location
                case "location":    Locations.add(message, command);                    break;
                // Add a zone
                case "zone":        Zones.add(message, command);                        break;
                // Invalid type passed to add command.
                default:            message.reply(`Invalid Type: ${command.type}`);     break;
            }
        break; 

        case "remove":
            switch(command.type)
            {
                // Remove ship
                case "ship":        Ships.remove(message, command);                     break;
                // Remove ship type
                case "shiptype":    ShipTypes.remove(message, command);                 break;
                // Remove location
                case "location":    Locations.remove(message, command);                 break;
                // Remove Location
                case "zone":        Zones.remove(message, command);                     break;
                // Invalid type passed to remove command.
                default:            message.reply(`Invalid Type: ${command.type}`);     break;
            }
        break;

        case "update":
            message.reply("Add will need a type");
        break;

        case "find":
            message.reply(`find the ship named: ${command.name}`);
        break;

        case "list":
            switch(command.type)
            {
                // List all the ships
                case "ships":       Ships.list(message, command);                       break;
                // List all ship types
                case "shiptype":    ShipTypes.list(message, command);                   break;
                // List all the locations
                case "locations":   Locations.list(message, command);                   break;
                // List all zones
                case "zones":       Zones.list(message, command);                       break;
                // Invalid type passed to list
                default:            message.reply(`Invalid Type: ${command.type}`);     break;
            }
        
            break;

        case "whatisyourpurpose":
            let replyMessage = new ReplyMessage("To serve!");
            message.reply(replyMessage.get());
        break;

        case "help":
            let messageContent = "SpiceNub supported commands\n"
                + "!help <command>: Shows the help menu if you provide a command it will only show information about the specific command\n" 
                + "!list <type>: Shows a list of resources matching the requested type\n"
                + "!add <type> <name>: Will add the type of resource requested and give it the specified name\n"
                + "!edit <type> <name>: \n"
                + "!remove <type> <name>: \n"
                + "!setLocation <ship> <location>: \n"
                + "!WhatIsYourPurpose: Let you know what SpiceNub is for ;)";
        
            message.reply(messageContent);
        break;

        // Default function to catch unrecognized commandes.
        default:                    message.reply(`Unrecognized command`);              break; 
    }
});

client.login(process.env.BOT_TOKEN);