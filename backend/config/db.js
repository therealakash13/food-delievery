import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://therealakash13:XBOIais1kOlH4To0@cluster0.zpwaxek.mongodb.net/foodi"
    )
    .then(() => console.log("DB Connected"));
};
