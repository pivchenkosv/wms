import {LOAD_PRODUCTS, PRODUCTS_WATCHER} from "../types/products"

export const loadProductsWatcher = (resolve) => {
    return {
        type: PRODUCTS_WATCHER,
        resolve: resolve
    }
}

export const loadProductsAction = (products) => {
    return {
        type: LOAD_PRODUCTS,
        payload: products
    }
}