import mongoose from 'mongoose'
const connection = {}

export async function connectDB() {
    if (connection.isConnected) {
        console.log('Already connected to the database');
        return;
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if(connection.isConnected === 1 ) {
            console.log("Use previous connect to the db.");
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log("New connection to the DB");
    connection.isConnected = db.connections[0].readyState;

}

export async function disconnectDB() {
    if (connection.isConnected) {
        if(process.env.NODE_ENV === "production") {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log("Not disconnecting from db.");
        }
    }
}

const db = { connectDB, disconnectDB};
export default db;