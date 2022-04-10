const mongoose = require("mongoose");

class Database
{
    static async connect()
    {
        try
        {
            await mongoose.connect(
                process.env.MONGO_URI,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    maxPoolSize: 50,
                    wtimeoutMS: 2500
                }
            );
        } catch(exception)
        {
            console.log("Could not connect to database!");
            exit();
        }
    }
}

module.exports = Database;