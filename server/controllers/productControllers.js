const Products = require("../models/products");
const slugify = require("slugify");
// it cemes from node so there is no need to install it, we use
const fs = require("fs");

const create = async (req, res) => {
  try {
    // we can send form data instead of JSON when we want to upload from desktopn npr pictures.
    // we need to install express-formidable and apply in our routes
    // request data can be found in req.fields
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    // we need to use same name as in our request
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "description is required" });
      case !price.trim():
        res.json({ error: "price is required" });
      case !category.trim():
        res.json({ error: "category is required" });
      case !quantity.trim():
        res.json({ error: "quantity is required" });
      case !shipping.trim():
        res.json({ error: "shipping is required" });
      case photo && photo.size > 1000000:
        res.json({ error: "Image should be less than 1mb in size" });
    }

    const product = new Products({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    // res.status(400).json({ message: error.message });
  }
};

const list = async (req, res) => {
  try {
    // with this query we are selecting everything (except phot field: -photo) and we limit are product to 12 items(product)
    // and we will sort it, the one we created latest will be first because of condition{ createdAt: -1 }
    // we can use populate "category" because we defined in our schema that category is object id with ref:'Category'
    const products = await Products.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.log(error.message);
  }
};

const read = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Products.findOne({ slug })
      .select("-photo")
      .populate("category");
    res.json(product);
  } catch (error) {
    console.log(error.message);
  }
};
// query to get photos
const photo = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findById(productId).select("photo");
    if (product.photo.data) {
      // setting content type for our axios calls
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

//delete product

const remove = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const deleted = await Products.findByIdAndDelete(productId).select(
      "-photo"
    );
    // res.json({ message: "Sucessfuly deleted product" }, deleted);
    return res.json(deleted);
  } catch (error) {}
};

const update = async (req, res) => {
  try {
    // we can send form data instead of JSON when we want to upload from desktopn npr pictures.
    // we need to install express-formidable and apply in our routes
    // request data can be found in req.fields
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    // we need to use same name as in our request
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "description is required" });
      case !price.trim():
        res.json({ error: "price is required" });
      case !category.trim():
        res.json({ error: "category is required" });
      case !quantity.trim():
        res.json({ error: "quantity is required" });
      case !shipping.trim():
        res.json({ error: "shipping is required" });
      case photo && photo.size > 1000000:
        res.json({ error: "Image should be less than 1mb in size" });
    }
    const { productId } = req.params;
    const product = await Products.findByIdAndUpdate(
      productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    // res.status(400).json({ message: error.message });
  }
};

module.exports = { create, list, read, photo, remove, update };
