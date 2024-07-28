import { ObjectId } from "mongodb";

const runDB = require('../assets/db');

interface User { 
    email: string;
    login: string;
    hash?: string;
}

interface Lesson {
    id: ObjectId;
    number: number;
}

const insertOneUser = async (email, login, hash): Promise<User> => {
    const db = await runDB();
            
    try {
        const usersCollection = db.collection('users');
        const result = await usersCollection.insertOne({
            'email': email,
            'login': login,
            'password': hash,
        });
        console.log(result);
    } finally {
        return db.client.close();
    }
}

const findOneUser = async (email: string, login: string): Promise<User> => {
    const db = await runDB();
    
    const userCollection = db.collection('users');
    
    const result = await userCollection.findOne({
        '$or': [
            { 'email': email },
            { 'login': login }
        ]
    });

    console.log(result);
        
    setTimeout(() => {
        db.client.close();
    }, 1500);

    return result;
}

const findOneUserByLogin = async (login: string): Promise<string> => {
    const db = await runDB();
    
    const userCollection = db.collection('users');
    
    const result = await userCollection.findOne({
        'login': login
    });

    console.log(result);
        
    setTimeout(() => {
        db.client.close();
    }, 1500);

    return result;
}

const findLessons = async (): Promise<number[]> => {
    const db = await runDB();

    const lessonsCollection = db.collection('lessons');

    const resultArr: number[] = [];
    const result: Lesson[] = await lessonsCollection.find({}, { projection: { _id: 0, number: 1 } });
    await result.forEach((doc: Lesson) => resultArr.push(doc.number));

    setTimeout(() => {
        db.client.close();
    }, 1500);

    return resultArr;
}

module.exports = {
    findOneUser, insertOneUser, findOneUserByLogin, findLessons
}