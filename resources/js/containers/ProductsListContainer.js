import {connect} from "react-redux";
import ProductsList from "../components/prodcut/ProductsList";

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, null)(ProductsList)
