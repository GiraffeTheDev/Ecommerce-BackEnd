const Product = require("../models/products");

const getAllProductService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.find({}).exec();
      if (data) {
        resolve({
          products: data,
        });
      } else {
        resolve({
          products: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const addNewProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Product.create({
        title: data.title,
        description: data.description,
        price: data.price,
        discountPercentage: data.discountPercentage,
        rating: data.rating,
        stock: data.stock,
        thumbnail: data.thumbnail,
        discountPrice: (data.discountPrice = Math.round(
          data.price * (1 - data.discountPercentage / 100)
        )),
      });

      if (response) {
        resolve({
          mess: "add new",
        });
      } else {
        resolve({
          message: "failed",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  });
};
const getAProductService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.findOne({ _id: id }).exec();
      if (data) {
        resolve({
          data: data,
        });
      } else {
        resolve({
          data: {},
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  });
};
const searchProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Product.find({
        $text: { $search: data },
      });
      if (response) {
        resolve({
          data: response,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  });
};
const deleteProductService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Product.findByIdAndDelete({
        _id: id,
      });
      if (response) {
        resolve({
          message: "Delete Book Done",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  });
};
const updateProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Product.updateOne(
        { _id: data._id },
        {
          title: data.title,
          description: data.description,
          price: data.price,
          discountPercentage: data.discountPercentage,
          rating: data.rating,
          stock: data.stock,
          thumbnail: data.thumbnail,
          discountPrice: data.discountPrice,
        }
      );
      if (response) {
        resolve({
          message: "Update Book Done",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  });
};
module.exports = {
  getAllProductService,
  addNewProductService,
  getAProductService,
  searchProductService,
  deleteProductService,
  updateProductService,
};
