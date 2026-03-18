import express from "express";

import {
    AddProduct,
    getAllProducts,
    searchProduct,
    editProduct,
    deleteProduct

} from '../controllers/productsController.js'

const productsRouter = express.Router();

productsRouter.post("/addproduct", AddProduct);
productsRouter.get("/allproducts", getAllProducts);
productsRouter.post("/searchproduct", searchProduct);
productsRouter.post("/editproduct", editProduct);
productsRouter.delete("/deleteproduct", deleteProduct);

export default productsRouter;
