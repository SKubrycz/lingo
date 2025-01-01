import { MongoClient, Db, ObjectId } from "mongodb";
import colors from "colors";

import { lesson1, lesson2 } from "./lessonsData";

const uri: string = "mongodb://localhost:27017/";

let client: MongoClient;
let db: Db;

interface CollectionsObj {
  lessons: boolean;
  users: boolean;
  usersLessons: boolean;
  usersLessonsSessions: boolean;
}

const collectionsObj: CollectionsObj = {
  lessons: false,
  users: false,
  usersLessons: false,
  usersLessonsSessions: false,
};

const insertToLessons = (db: Db) => {
  const lessonsCollection = db.collection("lessons");
  lessonsCollection.insertMany([lesson1, lesson2]);
};

export const connectToDb = async (): Promise<void> => {
  try {
    client = new MongoClient(uri, { connectTimeoutMS: 30000 });
    await client.connect();
    console.log("Connected successfully to " + colors.green("MongoClient"));

    db = client.db("language-app");

    const collections = await db.collections({ nameOnly: true });
    collections.forEach((col) => {
      if (col.collectionName === "lessons") collectionsObj.lessons = true;
      if (col.collectionName === "users-lessons")
        collectionsObj.usersLessons = true;
      if (col.collectionName === "users") collectionsObj.users = true;
    });

    if (!collectionsObj.lessons) {
      db.createCollection("lessons");
      insertToLessons(db);
    }
    if (!collectionsObj.users) {
      db.createCollection("users");
    }
    if (!collectionsObj.usersLessons) {
      db.createCollection("users-lessons");
    }
    if (!collectionsObj.usersLessonsSessions) {
      db.createCollection("users-lessons-sessions");
    }
  } catch (err) {
    console.log("mongodb err", err);
    closeDbConnection();
  }
};
connectToDb().catch(console.dir);

export const getDb = (): Db => {
  return db;
};

export const closeDbConnection = (): Promise<void> => {
  return client.close();
};
