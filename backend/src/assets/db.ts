const MongoClient = require("mongodb").MongoClient;

const uri = 
    "mongodb://localhost:27017/language-app";

const client = new MongoClient(uri, {});

const runDB = async () => {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        //const database = await client.db("language-app");

        //const cursor = await db.collection('users').find({});

        //const result = await cursor.toArray();

        //console.log(result);
        console.log("Connected successfully to the server");

        return client.db('language-app');
    } catch (err) {
        console.log('mongodb err', err);
        client.close();
    }
}
runDB().catch(console.dir);

module.exports = runDB;