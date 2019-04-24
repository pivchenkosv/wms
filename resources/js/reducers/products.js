import {LOAD_PRODUCTS} from "../types/products";

const ProductReducer = (state = {}, action ) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return {
                products: action.payload,
            }
        default:
            return state;
    }
}

export default ProductReducer;
