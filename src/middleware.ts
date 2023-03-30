import { Request, Response, NextFunction } from "express";
import { products } from "./database";

const validateId = (req: Request, res: Response, next: NextFunction): Response | void => {

    const requestId: number = parseInt(req.params.id)
    
    products.forEach((product) => {
        if(product.id === requestId){
            return next()
        }
    })

    return res.status(404).json({
        "message": "Product not found"
    })
}

const validateName = (req: Request, res: Response, next: NextFunction): Response |  void => {

    const name: string = req.body.name

    const exist: boolean = products.every((product) => product.name === name)

    if(!exist){
        return next()
    }
    
    return res.status(409).json({
        "message": "Product already registered" 
    })
}

export {
    validateId,
    validateName
}