
const dotenv = require("dotenv");
dotenv.config({path: ".env"});

const Discord   = require("discord.js");
const Database  = require("./configuration/database.js");
const Locations = require("./controllers/locations");
const Ships     = require("./controllers/ships")

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

    const commandBody = message.content.slice(prefix.length);
    const arguments = commandBody.split(' ');
    const command = arguments.shift().toLowerCase();
    const resourceType = arguments[0].toLowerCase();

    switch(command)
    {
        case "add":
            switch(resourceType)
            {
                // Add a ship
                case "ship":        Ships.add(message, arguments);                      break;
                // Add a location
                case "location":    Locations.add(message, arguments);                  break;
                // Invalid type passed to add command.
                default:            message.reply(`Invalid Type: ${resourceType}`);     break;
            }
        break; 
        case "remove":
            switch(resourceType)
            {
                // Remove ship
                case "ship":        Ships.remove(message, arguments);                   break;
                // Remove location
                case "location":    Locations.remove(message, arguments);               break;
                // Invalid type passed to remove command.
                default:            message.reply(`Invalid Type: ${resourceType}`);     break;
            }
        break;
        case "update":
            message.reply("Add will need a type");
        break;
        case "find":
            const shipName = arguments[0].toLowerCase();

            message.reply(`find the ship named: ${shipName}`);
        break;
        case "list":
            const listType = arguments[0];
            switch(arguments[0].toLowerCase())
            {
                // List all the ships
                case "ships":       Ships.list(message, arguments);                     break;
                // List all the locations
                case "locations":   Locations.list(message, arguments);                 break;
                // Invalid type passed to list
                default:            message.reply(`Invalid Type: ${listType}`);         break;
            }
        
            break;
        case "whatisyourpurpose":
            message.reply("To serve masters at Arma United!");
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