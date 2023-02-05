const Category = require("../models/category");
const slugify = require("slugify");

const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ message: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ message: "Category already exist" });
    }
    const category = await new Category({
      name,
      slug: slugify(name),
    }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const removed = await Category.findByIdAndDelete(id);
  res.json(removed);
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
const read = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { create, update, remove, list, read };
