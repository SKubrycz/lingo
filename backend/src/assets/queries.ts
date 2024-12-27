import { Db, UpdateResult, DeleteResult } from "mongodb";
import { Document, ObjectId } from "bson";
import { connectToDb, getDb, closeDbConnection } from "../assets/db";

interface User {
  _id: ObjectId;
  email: string;
  login: string;
  password: string;
  createdDate: Date;
}

interface UserStats {
  timeSpent: DOMHighResTimeStamp;
  lessonCount: number;
  lessonAccuracy: number;
  wordsLearned: number;
}

interface InsertUserData {
  email: string;
  login: string;
  password: string;
  uuid: string;
  verificationCode: string;
  verified: boolean;
}

interface InsertUser extends InsertUserData {
  role: string;
  stats: UserStats;
  createdDate: Date;
}

interface DeleteAccount {
  uuid: string;
  deletionCode: string;
}

interface FindUser {
  _id: ObjectId;
  email: string;
  login: string;
  password: string;
  uuid: string;
  verificationCode: string;
  verified: boolean;
  deleteAccount: DeleteAccount;
  createdDate: Date;
}

interface UpdateUser {
  _id: ObjectId;
  email: string;
  login: string;
  uuid: string;
  verified: boolean;
}

interface Exercise {
  exerciseId: number;
  type: string;
  word: string;
  description: string;
}

interface InputExercise extends Exercise {
  task: string;
  missingWords: string[] | string;
}

interface ExerciseData {
  exercise: Exercise;
  exerciseCount: number;
}

interface Lesson extends LessonView {
  exercises: Exercise[] | InputExercise[];
}

interface LessonView {
  id: ObjectId;
  lessonId: number;
  title: string;
  description: string;
  new_words: string[];
  exerciseCount: number;
}

interface LessonStats {
  wordsLearned: number;
}

interface FindUsersLessons {
  lessonId: number;
  timeSpent: DOMHighResTimeStamp;
  accuracy: Accuracy;
  finished: boolean;
}

interface Accuracy {
  [key: number]: boolean[];
}

interface UsersLessonsTimestamps {
  userId: ObjectId;
  lessonId: number;
  completedAt: Date;
}

export interface UsersLessons {
  userId: ObjectId;
  lessonId: number;
  timeSpent: DOMHighResTimeStamp;
  accuracy: Accuracy;
  timesCompleted: number;
  finished: boolean;
}

export const insertOneUser = async ({
  email,
  login,
  password,
  uuid,
  verificationCode,
  verified,
}: InsertUserData): Promise<void> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersCollection = db.collection<InsertUser>("users");

    const stats: UserStats = {
      timeSpent: 0,
      lessonCount: 0,
      lessonAccuracy: 0.0,
      wordsLearned: 0,
    };

    let usersLessonsArr: UsersLessons[] = [];

    const usersResult = await usersCollection.insertOne({
      email: email,
      login: login,
      password: password,
      uuid: uuid,
      verificationCode: verificationCode,
      verified: verified,
      role: "user",
      stats: stats,
      createdDate: new Date(Date.now()),
    });

    console.log(usersResult.insertedId);

    const lessonsCollection = db.collection<LessonView>("lessons");

    const lessonsResult = await lessonsCollection
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

    const lessonsResultArr = lessonsResult.map((res) => ({
      id: res._id,
      lessonId: res.lessonId,
      title: res.title,
      description: res.description,
      new_words: res.new_words,
      exerciseCount: res.exerciseCount,
    }));
    lessonsResultArr.forEach((el, i) => {
      usersLessonsArr.push({
        userId: usersResult.insertedId,
        lessonId: el.lessonId,
        timeSpent: 0,
        accuracy: {},
        timesCompleted: 0,
        finished: false,
      });
    });

    const usersLessonsCollection = db.collection<UsersLessons>("users-lessons");

    const usersLessonsResult = await usersLessonsCollection.insertMany(
      usersLessonsArr
    );
    //console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    closeDbConnection();
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
    closeDbConnection();
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
    closeDbConnection();
  }
};

export const findOneUserByUUID = async (
  uuid: string
): Promise<FindUser | null> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const userCollection = db.collection<FindUser>("users");
    const result = await userCollection.findOne({
      uuid: uuid,
    });

    return result;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};

export const updateOneUserByUUID = async (
  email: string,
  uuid: string
): Promise<UpdateResult | null> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const userCollection = db.collection<UpdateUser>("users");
    const result = await userCollection.updateOne(
      { email: { $eq: email }, uuid: { $eq: uuid } },
      {
        $set: { verified: true },
      }
    );

    return result;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};

export const deleteOneUserById = async (
  id: ObjectId
): Promise<DeleteResult[] | null> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const userCollection = db.collection<UpdateUser>("users");
    const userResult = await userCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (!userResult) return null;

    const usersLessonsCollection = db.collection<UsersLessons>("users-lessons");
    const usersLessonsResult = await usersLessonsCollection.deleteMany({
      userId: new ObjectId(id),
    });
    if (!usersLessonsResult) return null;

    const deletedResult = [userResult, usersLessonsResult];
    return deletedResult;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
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
    closeDbConnection();
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
    closeDbConnection();
  }
};

export const findUsersLessonsById = async (
  id: ObjectId
): Promise<FindUsersLessons[] | null> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsCollection = db.collection<UsersLessons>("users-lessons");

    const usersLessonsResult = await usersLessonsCollection
      .find(
        { userId: { $eq: new ObjectId(id) } },
        {
          projection: {
            lessonId: 1,
            timeSpent: 1,
            accuracy: 1,
            finished: 1,
          },
        }
      )
      .toArray();

    if (!usersLessonsResult) return null;

    const resultArr: FindUsersLessons[] = usersLessonsResult.map((res) => ({
      lessonId: res.lessonId,
      timeSpent: res.timeSpent,
      accuracy: res.accuracy,
      finished: res.finished,
    }));

    return resultArr;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};

export const findInputExerciseById = async (
  lessonId: number,
  exerciseId: number
): Promise<InputExercise | null> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const lessonsCollection = db.collection("lessons");
    const exerciseResult = await lessonsCollection.findOne(
      { lessonId: { $eq: lessonId } },
      {
        projection: {
          exercises: 1,
        },
      }
    );

    if (!exerciseResult) return null;

    const exercise = exerciseResult.exercises[exerciseId - 1];

    return exercise;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};

export const saveLessonProgressById = async (
  login: string,
  lessonId: number,
  exerciseId: number
): Promise<string | null> => {
  await connectToDb();
  const db: Db = await getDb();
  //let result: ExerciseData;
  let wordsLearned: string[] = [];

  try {
    const lessonsCollection = db.collection<Lesson>("lessons");

    const colResult = await lessonsCollection.findOne(
      { lessonId: lessonId },
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
      colResult.exercises.map((el, i) => {
        if (el.type === "card") wordsLearned.push(el.word);
      });

      const lessonStats: LessonStats = {
        wordsLearned: wordsLearned.length,
      };

      const usersCollection = db.collection<InsertUserData>("users");

      // ! TODO: Update only when finishing a certain lesson for the first time
      const updateUser = await usersCollection.updateOne(
        { login: { $eq: login } },
        {
          $set: { stats: lessonStats },
        }
      );

      console.log(updateUser);
    } else return null;

    return "Zapisano";
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};

export const updateLessonTimeSpent = async (
  id: ObjectId | undefined,
  lessonId: number,
  timeSpent: number
) => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsCollection = db.collection<UsersLessons>("users-lessons");

    const colResult = await usersLessonsCollection.updateOne(
      { userId: new ObjectId(id), lessonId: lessonId },
      {
        $inc: { timeSpent: timeSpent },
      }
    );

    if (!colResult) return null;

    return "Zapisano";
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};

export const getTimeSpent = async (
  id: ObjectId | undefined
): Promise<number | null | undefined> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsCollection = db.collection<UsersLessons>("users-lessons");
    const aggregation = [
      {
        $match: {
          userId: new ObjectId(id),
        },
      },
      {
        $group: {
          _id: null,
          totalTimeSpent: {
            $sum: "$timeSpent",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalTimeSpent: 1,
        },
      },
    ];

    const timeSpentResult = await usersLessonsCollection
      .aggregate(aggregation)
      .toArray();
    if (!timeSpentResult) return null;
    console.log(timeSpentResult[0].totalTimeSpent)
    return timeSpentResult[0].totalTimeSpent;
  } catch (error) {
    console.error(error);
  } finally {
    closeDbConnection();
  }
};

export const updateLessonOnFinish = async (
  id: ObjectId | undefined,
  lessonId: number
) => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsCollection = db.collection<UsersLessons>("users-lessons");

    const findResult = await usersLessonsCollection.findOneAndUpdate(
      {
        userId: new ObjectId(id),
        lessonId: lessonId,
      },
      {
        $inc: { timesCompleted: 1 },
        $set: { finished: true },
      }
    );

    if (!findResult) return null;

    return "Zapisano";
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};

export const updateLessonAccuracy = async (
  id: ObjectId | undefined,
  lessonId: number,
  exerciseId: number,
  correct: boolean
): Promise<string | null> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsCollection = db.collection<UsersLessons>("users-lessons");
    const findUsersLessonsResult = await usersLessonsCollection.findOne({
      userId: new ObjectId(id),
      lessonId: lessonId,
    });
    if (!findUsersLessonsResult) return null;

    console.log("findUsersLessonsResult:");
    console.log(findUsersLessonsResult);

    if (Object.keys(findUsersLessonsResult.accuracy).length < 1) {
      const lessonsCollection = db.collection<Lesson>("lessons");
      const findLessonResult = await lessonsCollection.findOne(
        { lessonId: lessonId },
        { projection: { exercises: 1 } }
      );
      if (!findLessonResult) return null;

      // count lessons which are interactive (NOT read-only)
      let interactiveCount = 0;
      let exerciseIdObj: Accuracy = {};
      findLessonResult.exercises.forEach((el, i) => {
        if (findLessonResult.exercises[i].type != "card") {
          interactiveCount++;
          exerciseIdObj[el.exerciseId] = [];
        }
      });
      const insertAccuracy = await usersLessonsCollection.updateOne(
        { userId: new ObjectId(id), lessonId: lessonId },
        {
          $set: {
            accuracy: exerciseIdObj,
          },
        }
      );

      console.log(`insertAcc: `, insertAccuracy);

      if (!insertAccuracy) return null;
    }

    const addAccuracy = await usersLessonsCollection.updateOne(
      { userId: new ObjectId(id), lessonId: lessonId },
      {
        $push: {
          [`accuracy.${exerciseId}`]: correct,
        },
      }
    );

    console.log("addAcc: ", addAccuracy);

    if (!addAccuracy) return null;

    return "Dokładność zaktualizowana";
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};

export const getAccuracy = async (
  id: ObjectId | undefined
): Promise<number | null> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsCollection = db.collection<UsersLessons>("users-lessons");
    const aggregation = [
      {
        $match: { userId: new ObjectId(id), $expr: {
          $gt: [{ $size: { $objectToArray: "$accuracy" } }, 0]
        }
         },
      },
      {
        $project: {
          accuracy: { $objectToArray: "$accuracy" },
        },
      },
      {
        $unwind: "$accuracy",
      },
      {
        $unwind: "$accuracy.v",
      },
      {
        $group: {
          _id: null,
          trueCount: {
            $sum: { $cond: [{ $eq: ["$accuracy.v", true] }, 1, 0] },
          },
          totalCount: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          averagePercentage: {
            $multiply: [{ $divide: ["$trueCount", "$totalCount"] }, 100],
          },
        },
      },
      {
        $project: {
          _id: 0,
          averagePercentage: 1,
        },
      },
    ];

    const accuracy = await usersLessonsCollection
      .aggregate(aggregation)
      .toArray();
    if (!accuracy) return null;

    const acc = accuracy[0];
    if (!acc) return -1;
    else {
      if ("averagePercentage" in acc) return acc.averagePercentage;
      else return -1;
    }
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};

export const insertLessonTimeStamp = async (
  id: ObjectId | undefined,
  lessonId: number
) => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsTimestampsCollection =
      db.collection<UsersLessonsTimestamps>("users-lessons-timestamps");
    const usersLessonsTimestampsResult =
      await usersLessonsTimestampsCollection.insertOne({
        userId: new ObjectId(id),
        lessonId: lessonId,
        completedAt: new Date(Date.now()),
      });

    if (!usersLessonsTimestampsResult) return null;

    return usersLessonsTimestampsResult;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};

export const getLessonsTimeStamps = async (
  id: ObjectId | undefined,
  dateRange: Date[]
) => {
  await connectToDb();
  const db: Db = await getDb();

  const dayDiff = dateRange[1].getDay() - dateRange[0].getDay();

  try {
    const usersLessonsTimestampsCollection = db.collection(
      "users-lessons-timestamps"
    );
    const usersLessonsTimestampsResult = await usersLessonsTimestampsCollection
      .aggregate([
        {
          $match: {
            userId: new ObjectId(id),
            completedAt: { $gte: dateRange[0], $lt: dateRange[1] },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$completedAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ])
      .toArray();

    if (!usersLessonsTimestampsResult) return null;

    let timestampsArr: number[] = [];
    timestampsArr.fill(0, 0, dayDiff);
    usersLessonsTimestampsResult.forEach((el, i) => {
      const elDate: Date = new Date(el._id);
      const elDateTime = elDate.getTime();
      const endTime = dateRange[1].getTime();
      const diff = Math.floor((endTime - elDateTime) / (1000 * 60 * 60 * 24));
      console.log(diff);
      timestampsArr[diff] = el.count;
    });

    return timestampsArr;
  } catch (error) {
    console.error(error);
  } finally {
    closeDbConnection();
  }
};

export const getAllLessonsTimestamps = async (id: ObjectId | undefined): Promise<number | null | undefined> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsTimestampsCollection = db.collection("users-lessons-timestamps");
    const aggregation = [
      {
        $match: {
          userId: new ObjectId(id)
        }
      },
      {
        $group: {
          _id: null,
          lessonCount: {
            $sum: 1,
          }
        }
      },
      {
        $project: {
          _id: 0,
          lessonCount: 1,
        }
      }
    ];
    const usersLessonsTimestampsResult = await usersLessonsTimestampsCollection.aggregate(aggregation).toArray();
    if (!usersLessonsTimestampsResult) return null;
    if (usersLessonsTimestampsResult.length > 0 && usersLessonsTimestampsResult[0].lessonCount) {
      return usersLessonsTimestampsResult[0].lessonCount;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  } finally {
    closeDbConnection()
  }
}

export const findLastFinishedUserLesson = async (
  id: ObjectId | undefined
): Promise<UsersLessons[] | string[] | null> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsCollection = db.collection<UsersLessons>("users-lessons");

    const findUsersLessonsResult = await usersLessonsCollection
      .find(
        {
          userId: new ObjectId(id),
          finished: true,
        },
        {
          projection: {
            _id: 1,
            lessonId: 1,
          },
        }
      )
      .sort("desc")
      .limit(1)
      .toArray();

    console.log(`findUsersLessonsResult: `);
    console.log(findUsersLessonsResult);

    if (!findUsersLessonsResult) return null;

    if (findUsersLessonsResult.length > 0) {
      const lessonsCollection = db.collection<Lesson>("lessons");

      const findLessonsResult = await lessonsCollection.findOne({
        lessonId: findUsersLessonsResult[0].lessonId,
      });

      if (!findLessonsResult) return null;

      let result: string[] = [];

      findLessonsResult.exercises.forEach((el, i) => {
        if (el.type === "card") {
          result.push(el.word);
        }
      });

      return result;
    } else return findUsersLessonsResult;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};

export const insertDeleteAccountData = async (
  id: ObjectId | undefined,
  uuid: string,
  deletionCode: string
): Promise<UpdateResult<User> | null> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersCollection = db.collection<User>("users");

    const result = await usersCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          deleteAccount: {
            uuid: uuid,
            deletionCode: deletionCode,
          },
        },
      },
      { upsert: true }
    );

    return result;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};

export const findDeletionCode = async (id: ObjectId | undefined) => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersCollection = db.collection<FindUser>("users");

    const findUserResult = await usersCollection.findOne(
      {
        _id: new ObjectId(id),
      },
      {
        projection: {
          login: 1,
          deleteAccount: 1,
        },
      }
    );

    if (!findUserResult) return null;
    else return findUserResult;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    closeDbConnection();
  }
};
