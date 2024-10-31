const mongoose = require('mongoose')

const databaseConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`database connected successfully at server ${conn.connection.host}`)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = databaseConnection