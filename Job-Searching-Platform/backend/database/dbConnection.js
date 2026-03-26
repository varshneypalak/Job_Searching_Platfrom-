import mongoose from "mongoose";

export const dbConnection = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URL, {
        dbName: "JOB_SEARCHING_WEBAPP"
    });

    console.log("Connected to Database!");
};
