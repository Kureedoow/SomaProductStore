import  express from "express";
import { creatingProduct, deleteProduct, getAllProducts, getSingleProduct, updatingProduct } from "../controllers/product.controller.js";

const router = express.Router()
//here is for geting all the products 
router.get('/', getAllProducts);
//here is for getting single product by id
router.get('/:id', getSingleProduct);

//here is for crteating or posting product
router.post('/', creatingProduct)

//here is for deleting products
router.delete('/:id', deleteProduct);

//hrer is for updating method 
router.put('/:id', updatingProduct);

export default router;