import express, { Application, json } from "express";
import {
    getProducts, 
    getProductsByID,
    postProducts,
    patchProducts
} from "./logics"
import { 
    validateId,
    validatePathName,
    validatePostName
} from "./middleware";

const App: Application = express()

App.use(json())

const baseURL = '/products'

App.get(`${baseURL}`, getProducts)
App.get(`${baseURL}/:id`, validateId, getProductsByID)

App.post(`${baseURL}`, validatePostName, postProducts)
App.patch(`${baseURL}/:id`, validateId, validatePathName, patchProducts)

App.listen(3000, () => {
    console.log("Server is running!")
})