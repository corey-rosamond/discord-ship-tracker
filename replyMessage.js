class ReplyMessage
{
    _message = null;
    
    constructor(message = "")
    {
        this._message = message;
    }

    get()
    {
        return this._message;
    }

    add(content)
    {
        this._message += content;
    }

    addLine(content)
    {
        this.add(content+"\n");
    }
}

module.exports = ReplyMessage;