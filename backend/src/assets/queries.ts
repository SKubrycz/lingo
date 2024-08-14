import { ObjectId, Db, WithId, Document, FindCursor } from "mongodb";
import { connectToDb, getDb, closeDbConnection } from '../assets/db';

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
    password: string;
    createdDate?: Date;
}

interface FindUser {
    _id: ObjectId;
    email: string;
    login: string;
    password: string;
    createdDate: Date;
}

interface Lesson {
    id: ObjectId;
    number: number;
    title: string;
    description: string;
    new_words: string[];
}

export const insertOneUser = async ({email, login, password}: InsertUser): Promise<void> => {
    await connectToDb();
    const db: Db = await getDb();
            
    try {
            const usersCollection = db.collection<InsertUser>('users');
            const result = await usersCollection.insertOne({
                'email': email,
                'login': login,
                'password': password,
                'createdDate': new Date(Date.now()),
            });
            //console.log(result);
    } catch (error) {
        console.error(error);
    } finally {
        await closeDbConnection();
    }
}

export const findOneUser = async (email: string, login: string): Promise<FindUser | null> => {
    await connectToDb();
    const db: Db = await getDb();
    
    try {
        const userCollection = db.collection<FindUser>('users');
        const result = await userCollection.findOne({
            '$or': [
                { 'email': email },
                { 'login': login }
            ]
        });
        //console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await closeDbConnection();
    }
}

export const findOneUserByLogin = async (login: string): Promise<FindUser | null> => {
    await connectToDb();
    const db: Db = await getDb();
    
    try {
        const userCollection = db.collection<FindUser>('users');
        const result = await userCollection.findOne({
            'login': login
        });
    
        //console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await closeDbConnection();
    }
}

export const findLessons = async (): Promise<Lesson[] | null> => {
    await connectToDb();
    const db: Db = await getDb();
    let resultArr: Lesson[] = [];

    try {
        const lessonsCollection = db.collection<Lesson>('lessons');

        const result = await lessonsCollection.find({}, {
            projection: {
                _id: 1,
                number: 1,
                title: 1,
                description: 1,
                new_words: 1,
            }
        }).toArray();

        resultArr = result.map((res) => ({
            id: res._id,
            number: res.number,
            title: res.title,
            description: res.description,
            new_words: res.new_words,
        }))

        //console.log(resultArr);
        return resultArr;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await closeDbConnection();
    }
}