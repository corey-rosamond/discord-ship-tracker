class Command
{
    _prefix         = "!";
    _command        = null;
    _commandString  = null;

    _type           = null;
    _name           = null;
    _location       = null;
    _zone           = null;

    constructor(message)
    {
        this._commandString = message.content.slice(this._prefix.length);
        if(!this._commandString.includes("-"))
        {
            this._command = this._commandString.toLowerCase();    
            return;
        }
        let parts = this._commandString.split('-');
        this._command = parts[0].trim().toLowerCase();
        parts.shift();
        parts.map(part => {
            let [action, value] = part.trim().toLowerCase().split("=");
            try
            {
                this[action] = value;
            } catch(error)
            {
                console.log(`${action} does not exist!`);
            }
        });
    }

    get()
    {
        return this._command;
    }

    set type(value)
    {
        this._type = value;
    }

    get type()
    {
        return this._type;
    }

    set name(value)
    {
        this._name = value;
    }

    get name()
    {
        return this._name;
    }

    set location(value)
    {
        this._location = value;
    }

    get location()
    {
        return this._location;
    }

    set zone(value)
    {
        this._zone = value;
    }

    get zone()
    {
        return this._zone;
    }
}

module.exports = Command;