import { ObjectId, Db } from "mongodb";
import { connectToDb, getDb, closeDbConnection } from "../assets/db";

interface User {
  _id: ObjectId;
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

interface Exercise {
  exerciseId: number;
  type: string;
  word: string;
  description: string;
}

interface ExerciseData {
  exercise: Exercise;
  exerciseCount: number;
}

interface Lesson extends LessonView {
  exercises: Exercise[];
}

interface LessonView {
  id: ObjectId;
  lessonId: number;
  title: string;
  description: string;
  new_words: string[];
  exerciseCount: number;
}

export const insertOneUser = async ({
  email,
  login,
  password,
}: InsertUser): Promise<void> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersCollection = db.collection<InsertUser>("users");
    const result = await usersCollection.insertOne({
      email: email,
      login: login,
      password: password,
      createdDate: new Date(Date.now()),
    });
    //console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    await closeDbConnection();
  }
};

export const findOneUser = async (
  email: string,
  login: string
): Promise<FindUser | null> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const userCollection = db.collection<FindUser>("users");
    const result = await userCollection.findOne({
      $or: [{ email: email }, { login: login }],
    });
    //console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await closeDbConnection();
  }
};

export const findOneUserByLogin = async (
  login: string
): Promise<FindUser | null> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const userCollection = db.collection<FindUser>("users");
    const result = await userCollection.findOne({
      login: login,
    });

    //console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await closeDbConnection();
  }
};

export const findLessonsList = async (): Promise<LessonView[] | null> => {
  await connectToDb();
  const db: Db = await getDb();
  let resultArr: LessonView[] = [];

  try {
    const lessonsCollection = db.collection<LessonView>("lessons");

    const result = await lessonsCollection
      .find(
        {},
        {
          projection: {
            _id: 1,
            lessonId: 1,
            title: 1,
            description: 1,
            new_words: 1,
            exerciseCount: 1,
          },
        }
      )
      .toArray();

    resultArr = result.map((res) => ({
      id: res._id,
      lessonId: res.lessonId,
      title: res.title,
      description: res.description,
      new_words: res.new_words,
      exerciseCount: res.exerciseCount,
    }));

    //console.log(resultArr);
    return resultArr;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await closeDbConnection();
  }
};

export const findLessonById = async (
  lessonId: number,
  exerciseId: number
): Promise<ExerciseData | null> => {
  await connectToDb();
  const db: Db = await getDb();
  let result: ExerciseData;

  try {
    const lessonsCollection = db.collection<Lesson>("lessons");

    const colResult = await lessonsCollection.findOne(
      { lessonId: lessonId, "exercises.exerciseId": exerciseId },
      {
        projection: {
          _id: 1,
          lessonId: 1,
          exercises: 1,
          exerciseCount: 1,
        },
      }
    );

    if (colResult) {
      let exercise = colResult.exercises.filter(
        (ex) => ex.exerciseId === exerciseId
      );
      result = {
        exercise: exercise[0],
        exerciseCount: colResult.exerciseCount,
      };
      console.log(result);
    } else return null;

    return result;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await closeDbConnection();
  }
};
