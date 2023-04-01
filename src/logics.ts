import { Request, Response } from "express";
import { 
    newId,
    qtdProdutcs,
    products,
    expirationDate
} from "./database";
import {
    IProduct,
    ICleaningProduct,
    IFoodProduct
} from "./intefaces" 

const getProducts = (req: Request, res: Response): Response => {

    const AllProdutcs = {
        "total": qtdProdutcs(),
        "marketProducts": products
    }

    return res.json(AllProdutcs)
}

const getProductsByID = (req: Request, res: Response): Response => {

    const product = products.filter((product) => {
        if(product.id === parseInt(req.params.id)){
            return product
        }
    })

    return res.json(product[0])
}

const postProducts = (req: Request, res: Response): Response => {

    const productsArray: IProduct[] = req.body

    newId()

    productsArray.map((product: ICleaningProduct | IFoodProduct): void => {
        const id: number = newId()

        const date: Date = expirationDate()
       
        products.push({
            ...product,
            id: id,
            expirationDate: date
        })
    })

    return res.status(201).json({
        "total": qtdProdutcs(),
        "marketProducts": products
    })
}

const patchProducts = (req: Request, res: Response): Response => {

    const alterations: IProduct = req.body
    
    const productId: number = parseInt(req.params.id)

    let product: IFoodProduct | ICleaningProduct | undefined = products.find((product) => {
        return product.id === productId
    })

    product = {
        ...product,
        ...alterations
    }

    const productIndex: number = products.findIndex((product) => product.id === productId)
    
    products[productIndex] = product!

    return res.json(product)
}


export {
    getProducts,
    getProductsByID,
    postProducts,
    patchProducts
}