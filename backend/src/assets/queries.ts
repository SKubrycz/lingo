import { ObjectId } from "mongodb";

const runDB = require('../assets/db');

interface User {
    _id: ObjectId,
    email: string;
    login: string;
    password: string;
    createdDate: Date;
}

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

    let result: Promise<FindUser>;
    
    try {
        const userCollection = db.collection('users');
        result = await userCollection.findOne({
            '$or': [
                { 'email': email },
                { 'login': login }
            ]
        });
        console.log(result);
    } finally {
        await db.client.close();
        return result;
    }
}

const findOneUserByLogin = async (login: string): Promise<User> => {
    const db = await runDB();
    let result: User;
    
    try {
        const userCollection = db.collection('users');
        result = await userCollection.findOne({
            'login': login
        });
    
        console.log(result);
    } finally {
        await db.client.close();
        return result;
    }
}

const findLessons = async (): Promise<Lesson[]> => {
    const db = await runDB();
    let resultArr: Lesson[] = [];

    try {
        const lessonsCollection = db.collection('lessons');

        const result: Lesson[] = await lessonsCollection.find({});
        await result.forEach((doc: Lesson) => resultArr.push(doc));
    
        console.log(resultArr);
    } finally {
        await db.client.close();
        return resultArr;
    }
}

module.exports = {
    findOneUser, insertOneUser, findOneUserByLogin, findLessons
}