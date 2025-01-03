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
  role: "admin" | "user";
  deleteAccount: DeleteAccount;
  adminCode?: AdminCode;
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
  newWords: string[];
  exerciseCount: number;
}

interface AdminCode {
  code: string;
  expiry: Date | undefined;
}

interface FindUsersLessons {
  lessonId: number;
  finished: boolean;
}

interface UsersLessonsSessions {
  userId: ObjectId;
  lessonId: number;
  correct: boolean[];
  timeSpent: DOMHighResTimeStamp;
  completedAt: Date;
}

export interface UsersLessons {
  userId: ObjectId;
  lessonId: number;
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

    let usersLessonsArr: UsersLessons[] = [];

    const usersResult = await usersCollection.insertOne({
      email: email,
      login: login,
      password: password,
      uuid: uuid,
      verificationCode: verificationCode,
      verified: verified,
      role: "user",
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
            newWords: 1,
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
      newWords: res.newWords,
      exerciseCount: res.exerciseCount,
    }));
    lessonsResultArr.forEach((el, i) => {
      usersLessonsArr.push({
        userId: usersResult.insertedId,
        lessonId: el.lessonId,
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

export const findAdminCode = async (
  id: ObjectId | undefined,
  code: string | undefined
): Promise<FindUser | null | undefined> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersCollection = db.collection<FindUser>("users");
    const userResult = await usersCollection.findOne({
      _id: new ObjectId(id),
      "adminCode.code": code,
    });
    console.log(userResult);
    if (!userResult) return null;
    if (!userResult.adminCode) return null;

    return userResult;
  } catch (error) {
    console.error(error);
  } finally {
    closeDbConnection();
  }
};

export const upsertAdminCode = async (
  id: ObjectId | undefined,
  code: string,
  expiry: Date | undefined
): Promise<UpdateResult | null> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const adminCode: AdminCode = {
      code: code,
      expiry: expiry,
    };

    const userCollection = db.collection<UpdateUser>("users");
    const result = await userCollection.updateOne(
      { _id: new ObjectId(id), role: { $eq: "admin" } },
      {
        $set: { adminCode: adminCode },
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

    const usersLessonsTimestampsCollection =
      db.collection<UsersLessonsSessions>("users-lessons-sessions");
    const usersLessonsTimestampsResult =
      await usersLessonsTimestampsCollection.deleteMany({
        userId: new ObjectId(id),
      });
    if (!usersLessonsTimestampsResult) return null;
    const deletedResult = [
      userResult,
      usersLessonsResult,
      usersLessonsTimestampsResult,
    ];
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
            newWords: 1,
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
      newWords: res.newWords,
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
            finished: 1,
          },
        }
      )
      .toArray();

    if (!usersLessonsResult) return null;

    const resultArr: FindUsersLessons[] = usersLessonsResult.map((res) => ({
      lessonId: res.lessonId,
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

export const getTimeSpent = async (
  id: ObjectId | undefined
): Promise<number | null | undefined> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsCollection = db.collection<UsersLessons>(
      "users-lessons-sessions"
    );
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
    if (timeSpentResult.length > 0) return timeSpentResult[0].totalTimeSpent;
    else return 0;
  } catch (error) {
    console.error(error);
  } finally {
    closeDbConnection();
  }
};

export const getAccuracy = async (
  id: ObjectId | undefined
): Promise<number | null | undefined> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsSessionsCollection = db.collection(
      "users-lessons-sessions"
    );
    const aggregation = [
      {
        $match: {
          userId: new ObjectId(id),
        },
      },
      {
        $project: {
          totalCount: { $size: "$correct" },
          trueCount: {
            $size: {
              $filter: {
                input: "$correct",
                as: "value",
                cond: { $eq: ["$$value", true] },
              },
            },
          },
        },
      },
      {
        $project: {
          percentage: {
            $multiply: [{ $divide: ["$trueCount", "$totalCount"] }, 100],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPercentage: {
            $sum: "$percentage",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          accuracy: {
            $divide: ["$totalPercentage", "$count"],
          },
        },
      },
      {
        $project: {
          _id: 0,
          accuracy: 1,
        },
      },
    ];

    const sessionsResult = await usersLessonsSessionsCollection
      .aggregate(aggregation)
      .toArray();

    console.log("sessionsResult");
    console.log(sessionsResult);
    if (!sessionsResult) return null;

    if (sessionsResult.length > 0) {
      if (sessionsResult[0].accuracy) return sessionsResult[0].accuracy;
    } else return 0;
  } catch (error) {
    console.error(error);
  } finally {
    closeDbConnection();
  }
};

export const updateLessonOnFinish = async (
  id: ObjectId | undefined,
  lessonId: number,
  correct: boolean[],
  timeSpent: DOMHighResTimeStamp
) => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsCollection = db.collection<UsersLessons>("users-lessons");
    const usersLessonsSessionsCollection = db.collection<UsersLessonsSessions>(
      "users-lessons-sessions"
    );

    const findResult = await usersLessonsCollection.findOneAndUpdate(
      {
        userId: new ObjectId(id),
        lessonId: lessonId,
      },
      {
        $set: { finished: true },
      }
    );
    if (!findResult) return null;

    const sessionResult = await usersLessonsSessionsCollection.insertOne({
      userId: new ObjectId(id),
      lessonId: lessonId,
      correct: correct,
      timeSpent: timeSpent,
      completedAt: new Date(Date.now()),
    });
    if (!sessionResult) return null;

    return "Zapisano";
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
      "users-lessons-sessions"
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

    console.log(`usersLessonsTimestampsResult: `);
    console.log(usersLessonsTimestampsResult);
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

export const getAllLessonsTimestamps = async (
  id: ObjectId | undefined
): Promise<number | null | undefined> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const usersLessonsTimestampsCollection = db.collection(
      "users-lessons-sessions"
    );
    const aggregation = [
      {
        $match: {
          userId: new ObjectId(id),
        },
      },
      {
        $group: {
          _id: null,
          lessonCount: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          lessonCount: 1,
        },
      },
    ];
    const usersLessonsTimestampsResult = await usersLessonsTimestampsCollection
      .aggregate(aggregation)
      .toArray();
    console.log(`getAllLessonsTimeStamps: `);
    console.log(usersLessonsTimestampsResult);
    if (!usersLessonsTimestampsResult) return null;
    if (usersLessonsTimestampsResult.length > 0) {
      if (usersLessonsTimestampsResult[0].lessonCount) {
        return usersLessonsTimestampsResult[0].lessonCount;
      }
    }
    if (usersLessonsTimestampsResult.length === 0) {
      return 0;
    }

    return null;
  } catch (error) {
    console.error(error);
  } finally {
    closeDbConnection();
  }
};

export const getFinishedLessonsWords = async (
  id: ObjectId | undefined
): Promise<number | null | undefined> => {
  await connectToDb();
  const db: Db = await getDb();

  try {
    const userLessonsCollection = await db.collection("users-lessons");
    const lessonsCollection = await db.collection("lessons");
    const aggregation = [
      {
        $match: {
          userId: new ObjectId(id),
          finished: true,
        },
      },
      {
        $lookup: {
          from: "lessons",
          localField: "lessonId",
          foreignField: "lessonId",
          as: "lessonDetails",
        },
      },
      {
        $unwind: {
          path: "$lessonDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: null,
          totalNewWords: {
            $sum: {
              $size: "$lessonDetails.newWords",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalNewWords: 1,
        },
      },
    ];
    const usersLessonsResult = await userLessonsCollection
      .aggregate(aggregation)
      .toArray();

    if (!usersLessonsResult) return null;
    if (usersLessonsResult.length > 0) {
      if (usersLessonsResult[0].totalNewWords) {
        return usersLessonsResult[0].totalNewWords;
      }
    }
    if (usersLessonsResult.length === 0) {
      return 0;
    }

    return null;
  } catch (error) {
    console.error(error);
  } finally {
    closeDbConnection();
  }
};

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
