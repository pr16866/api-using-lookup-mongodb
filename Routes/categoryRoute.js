// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const Category = require("../Modal/category.js");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({
      name,
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
