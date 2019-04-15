import {connect} from "react-redux";
import ProductsList from "../components/prodcut/ProductsList";
import {loadProductsWatcher} from "../actions/products";
import {bindActionCreators} from "redux";

const mapStateToProps = (store) => {
    return {
        user: store.user,
        products: store.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loadProductsWatcher
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
