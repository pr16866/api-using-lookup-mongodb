// app.js
const express = require("express");
const app = express();
const { dbConnect } = require("./Db/db.js");
const productRoutes = require("./Routes/productRoute.js");
const categoryRoutes = require("./Routes/categoryRoute.js");
dbConnect();

app.use(express.json());
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
