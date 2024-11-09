import { MongoClient, Db, ObjectId } from "mongodb";
import colors from "colors";

const uri: string = "mongodb://localhost:27017/";

//TODO (Edit: Likely fixed): Examine client.close() bug which throws an error

let client: MongoClient;
let db: Db;

interface CollectionsObj {
  lessons: boolean;
  usersLessons: boolean;
  users: boolean;
}

const collectionsObj: CollectionsObj = {
  lessons: false,
  usersLessons: false,
  users: false,
};

const insertToLessons = (db: Db) => {
  const lessonsCollection = db.collection("lessons");
  lessonsCollection.insertMany([
    {
      _id: new ObjectId("66af513c23082b6501dade65"),
      number: 1,
      title: "Wprowadzenie",
      description: "Nauczysz się jak przywitać się w języku angielskim",
      new_words: [
        "Hi",
        "Hello",
        "Good morning",
        "Good afternoon",
        "Good evening",
        "Goodbye",
        "Bye",
      ],
    },
    {
      _id: new ObjectId("66c0cc3ffba0ae1abe9684b0"),
      number: 2,
      title: "Zwroty w różnych osobach",
      description: "Lorem ipsum opis drugiej lekcji",
      new_words: ["Me", "You", "He", "She", "They", "Mr", "Mrs"],
    },
  ]);
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
    if (!collectionsObj.usersLessons) {
      db.createCollection("users-lessons");
    }
    if (!collectionsObj.users) {
      db.createCollection("users");
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
