import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = process.env.PORT || 4000;

if (!process.env.MONGO_URI) {
  throw new Error("Uri must be provided");
}

const mongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("connected to db");
  } catch (error) {
    console.log({ error });
  }
};

mongooseConnect();

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
