import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connectDB() {
    try {
        const url = process.env.MONGODB_URL;
        mongoose.connect(`${url}/Cargo-Tracker`).then(() => {
            console.log("DB Connected");
        });
    } catch (error) {
        console.error("Error connecting to the database", error);
        throw "DB Connection Failed";
    }
}

export default connectDB;
