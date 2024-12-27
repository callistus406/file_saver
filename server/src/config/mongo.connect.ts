import mongoose from "mongoose";

const connectMongo = () => {
  mongoose
    .connect("mongodb+srv://julyverybest:BLmSX4y3k8PtbcsG@cluster0.svqo2ef.mongodb.net/file_upload?retryWrites=true&w=majority")
    .then(() => console.log(" MongoDB Connected"))
    .catch((err) => console.error("MongoDB Error:", err));
};


export default connectMongo