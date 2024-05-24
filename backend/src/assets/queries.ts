const runDB = require('../assets/db');

const insertOneUser = async (email, login, hash) => {
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
        db.client.close();
    }
}

const findOneUser = async (email, login) => {
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

const findOneUserByLogin = async (login) => {
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

const findLessons = async () => {
    const db = await runDB();

    const lessonsCollection = db.collection('lessons');

    const resultArr = [];
    const result = await lessonsCollection.find({}, { projection: { _id: 0, number: 1 } });
    await result.forEach(doc => resultArr.push(doc.number));

    setTimeout(() => {
        db.client.close();
    }, 1500);

    return resultArr;
}

module.exports = {
    findOneUser, insertOneUser, findOneUserByLogin, findLessons
}