import { Request, Response, NextFunction } from "express";
import { products } from "./database";
import { IProduct } from "./intefaces";

const validateId = (req: Request, res: Response, next: NextFunction): Response | void => {

    const requestId: number = parseInt(req.params.id)

    products.forEach((product) => {
        if(product.id === requestId){
            return next()
        }
    })

    return res.status(404).json({
        "error": "Product not found"
    })
}

const validatePostName = (req: Request, res: Response, next: NextFunction): Response |  void => {

    req.body.forEach((product: IProduct) => {
        products.forEach((item: IProduct) => {
            if(product.name === item.name){
                return res.status(409).json({
                    "error": "Product already registered"
                })
            }
        })
    })


    return next()
}

const validatePathName = (req: Request, res: Response, next: NextFunction): Response | void => {

    products.forEach((product) => {
        if(req.body.name === product.name){
            return res.status(409).json({
                "error": "Product already registered"
            })
        }
    })

    return next()

}

const ensurePathData = (req: Request, res: Response, next: NextFunction): Response | void => {

    delete req.body?.id
    delete req.body?.section
    delete req.body?.expirationDate

    return next()
}

export {
    validateId,
    validatePostName,
    validatePathName,
    ensurePathData
}