import { MongoClient, Db, ObjectId } from "mongodb";
import colors from "colors";

import { lesson1Pl, lesson1De, lesson2Pl, lesson2De } from "./lessonsData";
import { aboutLangData } from "./routeLangData/about";
import { homeLangData } from "./routeLangData/home";
import { loginLangData } from "./routeLangData/login";
import { registerLangData } from "./routeLangData/register";
import { lessonsLangData } from "./routeLangData/lessons";
import { profileLangData } from "./routeLangData/profile";
import { lessonLangData } from "./routeLangData/lesson";
import {
  cardExercisePl,
  cardExerciseDe,
  choiceExercisePl,
  choiceExerciseDe,
  inputExercisePl,
  inputExerciseDe,
  matchExercisePl,
  matchExerciseDe,
} from "./exerciseUIData";
import { logoutLangData } from "./routeLangData/logout";
import { verifyLangData } from "./routeLangData/verify";
import { deleteAccountLangData } from "./routeLangData/delete";

const uri: string = "mongodb://localhost:27017/";

let client: MongoClient;
let db: Db;

interface CollectionsObj {
  exerciseUI: boolean;
  routes: boolean;
  lessons: boolean;
  users: boolean;
  usersLessons: boolean;
  usersLessonsSessions: boolean;
}

const collectionsObj: CollectionsObj = {
  exerciseUI: false,
  routes: false,
  lessons: false,
  users: false,
  usersLessons: false,
  usersLessonsSessions: false,
};

const insertToExerciseUI = async (db: Db) => {
  const exerciseUICollection = db.collection("exercise-ui");
  const result = await exerciseUICollection.insertMany([
    cardExercisePl,
    cardExerciseDe,
    choiceExercisePl,
    choiceExerciseDe,
    inputExercisePl,
    inputExerciseDe,
    matchExercisePl,
    matchExerciseDe,
  ]);

  console.log(`exercise-ui inserted:`);
  console.log(result);
};

const insertToRoutes = async (db: Db) => {
  const routesCollection = db.collection("routes");
  const result = await routesCollection.insertMany([
    aboutLangData[0],
    aboutLangData[1],
    homeLangData[0],
    homeLangData[1],
    loginLangData[0],
    loginLangData[1],
    registerLangData[0],
    registerLangData[1],
    lessonsLangData[0],
    lessonsLangData[1],
    profileLangData[0],
    profileLangData[1],
    lessonLangData[0],
    lessonLangData[1],
    logoutLangData[0],
    logoutLangData[1],
    verifyLangData[0],
    verifyLangData[1],
    deleteAccountLangData[0],
    deleteAccountLangData[1],
  ]);

  console.log(`routes inserted:`);
  console.log(result);
};

const insertToLessons = async (db: Db) => {
  const lessonsCollection = db.collection("lessons");
  const result = await lessonsCollection.insertMany([
    lesson1Pl,
    lesson1De,
    lesson2Pl,
    lesson2De,
  ]);
  console.log(`lessons inserted:`);
  console.log(result);
};

export const connectToDb = async (): Promise<void> => {
  try {
    client = new MongoClient(uri, { connectTimeoutMS: 30000 });
    await client.connect();
    console.log("Connected successfully to " + colors.green("MongoClient"));

    db = client.db("language-app");

    const collections = await db.collections({ nameOnly: true });
    collections.forEach((col) => {
      if (col.collectionName === "exercise-ui")
        collectionsObj.exerciseUI = true;
      if (col.collectionName === "routes") collectionsObj.routes = true;
      if (col.collectionName === "lessons") collectionsObj.lessons = true;
      if (col.collectionName === "users-lessons")
        collectionsObj.usersLessons = true;
      if (col.collectionName === "users") collectionsObj.users = true;
      if (col.collectionName === "users-lessons-sessions")
        collectionsObj.usersLessonsSessions = true;
    });

    if (!collectionsObj.exerciseUI) {
      db.createCollection("exercise-ui");
      await insertToExerciseUI(db);
    }
    if (!collectionsObj.routes) {
      db.createCollection("routes");
      await insertToRoutes(db);
    }
    if (!collectionsObj.lessons) {
      db.createCollection("lessons");
      await insertToLessons(db);
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
