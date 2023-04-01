import { IProduct } from "./intefaces"

let products: Array<IProduct> = []

const newId = (): number => {

    let id: number = 1

    products.map((product) => {
        id = product.id + 1
    })

    return id
}

const qtdProdutcs = (): number => {

    const qtd = products.length

    return qtd
}

function expirationDate(): any{

    const date = new Date()

    date.setFullYear(2024)

    return date
}

export {
    newId,
    qtdProdutcs,
    products,
    expirationDate
}