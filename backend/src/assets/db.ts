import { MongoClient, Db } from 'mongodb'
import colors from 'colors';

const uri: string = 
    "mongodb://localhost:27017/language-app";

//TODO (Edit: Likely fixed): Examine client.close() bug which throws an error

let client: MongoClient;
let db: Db;

export const connectToDb = async (): Promise<void> => {
    try {
        client = new MongoClient(uri, { connectTimeoutMS: 30000 });
        await client.connect();
        console.log("Connected successfully to " + colors.green("MongoClient"));

        db = client.db('language-app');
    } catch (err) {
        console.log('mongodb err', err);
        closeDbConnection();
    }
}
connectToDb().catch(console.dir);

export const getDb = (): Db =>  {
    return db;
}

export const closeDbConnection = (): Promise<void> => {
    return client.close();
}