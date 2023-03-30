import express, { Application, json } from "express";
import {
    getProducts, 
    getProductsByID,
    postProducts
} from "./logics"
import { 
    validateId,
    validateName
} from "./middleware";

const App: Application = express()

App.use(json())

const baseURL = '/products'

App.get(`${baseURL}`, getProducts)
App.get(`${baseURL}/:id`, validateId, getProductsByID)

App.post(`${baseURL}`, validateName, postProducts)


App.listen(3000, () => {
    console.log("Server is running!")
})