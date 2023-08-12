const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://8529745331:8529745331@cluster0.bkcf8.mongodb.net/product_category_db",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};

module.exports = { dbConnect };
