import { ObjectId } from "mongodb";

const runDB = require('../assets/db');

interface InsertUser { 
    email: string;
    login: string;
    hash: string;
    createdDate: Date;
}

interface FindUser {
    email: string;
    login: string;
    createdDate: Date;
}

interface Lesson {
    id: ObjectId;
    number: number;
    title: string;
    description: string;
    new_words: string[];
}

const insertOneUser = async (email, login, hash): Promise<InsertUser> => {
    const db = await runDB();
            
    try {
        const usersCollection = db.collection('users');
        const result = await usersCollection.insertOne({
            'email': email,
            'login': login,
            'password': hash,
            'createdDate': new Date(Date.now()),
        });
        console.log(result);
    } finally {
        return db.client.close();
    }
}

const findOneUser = async (email: string, login: string): Promise<FindUser> => {
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

const findLessons = async (): Promise<Lesson[]> => {
    const db = await runDB();

    const lessonsCollection = db.collection('lessons');

    const resultArr: Lesson[] = [];
    const result: Lesson[] = await lessonsCollection.find({});
    await result.forEach((doc: Lesson) => resultArr.push(doc));

    console.log(resultArr);

    setTimeout(() => {
        db.client.close();
    }, 1500);

    return resultArr;
}

module.exports = {
    findOneUser, insertOneUser, findOneUserByLogin, findLessons
}