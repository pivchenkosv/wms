import {connect} from "react-redux";
import StocksList from "../components/stock/StocksList";

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, null)(StocksList)
