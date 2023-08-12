// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../Modal/product.js");
// one way
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find().populate("categoryId");
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// another way
router.get("/", async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories", // Ensure this matches your actual collection name
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          name: 1,
          price: 1,
          categoryName: "$category.name",
        },
      },
    ]);

    console.log(products); // Log the products before sending the response

    res.json(products);
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: error.message });
  }
});
// Update a product by ID
router.patch("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Create a new product
router.post("/", async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;

    const product = new Product({
      name,
      price,
      categoryId: categoryId,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
