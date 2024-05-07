const {
  getAllProductService,
  addNewProductService,
  getAProductService,
  searchProductService,
  deleteProductService,
  updateProductService,
} = require("../service/productService");

const getAllProductController = async (req, res) => {
  try {
    const response = await getAllProductService();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error from server",
    });
  }
};
const addNewProductController = async (req, res) => {
  try {
    const response = await addNewProductService(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error from server",
    });
  }
};
const getAProductController = async (req, res) => {
  try {
    const response = await getAProductService(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error from server",
    });
  }
};
const searchProductController = async (req, res) => {
  try {
    const response = await searchProductService(req.query.search);
    if (!response) {
      res.status(404).json({
        message: "Product Not Found",
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error from server",
    });
  }
};
const deleteProductController = async (req, res) => {
  try {
    const response = await deleteProductService(req.params.search);
    if (!response) {
      res.status(404).json({
        message: "Product Not Found",
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error from server",
    });
  }
};
const updateProductController = async (req, res) => {
  try {
    const response = await updateProductService(req.params.search);
    if (!response) {
      res.status(404).json({
        message: "Product Not Found",
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error from server",
    });
  }
};
module.exports = {
  getAllProductController,
  addNewProductController,
  getAProductController,
  searchProductController,
  deleteProductController,
  updateProductController,
};
