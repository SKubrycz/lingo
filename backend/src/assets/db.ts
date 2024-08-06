const MongoClient = require("mongodb").MongoClient;

const uri = 
    "mongodb://localhost:27017/language-app";

//TODO: Examine client.close() bug which throws an error

const client = new MongoClient(uri, { connectTimeoutMS: 30000 });

const runDB = async () => {
    try {
        await client.connect();
        console.log("Connected successfully to the server");

        return client.db('language-app');
    } catch (err) {
        console.log('mongodb err', err);
        client.close();
    }
}
runDB().catch(console.dir);

module.exports = runDB;