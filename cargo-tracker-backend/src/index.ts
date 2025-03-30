import express from "express";
import appRouter from "./route";
import cors from "cors";
import connectDB from "./db/dbConfig";

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/v1", appRouter);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
