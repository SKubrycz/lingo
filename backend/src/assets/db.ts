const { MongoClient } = require("mongodb");

const uri = 
    "mongodb://localhost:27017/language-app";

const client = new MongoClient(uri, {
});

const runDB = async () => {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        const db = await client.db("language-app")

        const cursor = await db.collection('users').find({ login: "Qweqwe" });

        const result = await cursor.toArray();

        console.log(result);
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
runDB().catch(console.dir);

module.exports = runDB();