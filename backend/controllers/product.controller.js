import mongoose from "mongoose";
import Product from "../modals/product.modal.js";

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log("Error fetching products:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Single Product
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log("Error fetching product:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Create Product
export const creatingProduct = async (req, res) => {
  try {
    const productData = req.body;

    if (
      !productData.Name ||
      !productData.Price ||
      !productData.Image
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const newProduct = new Product(productData);

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log("Error creating product:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error while creating product",
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting product:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error while deleting product",
    });
  }
};

// Update Product
export const updatingProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log("Error updating product:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error while updating product",
    });
  }
};