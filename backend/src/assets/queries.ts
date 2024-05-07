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

module.exports = {
    findOneUser, insertOneUser
}
