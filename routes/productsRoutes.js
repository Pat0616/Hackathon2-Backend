import express from "express";

import {
    AddProduct
} from '../controllers/productsController.js'

const productsRouter = express.Router();

productsRouter.post("/addproduct", AddProduct);

export default productsRouter;