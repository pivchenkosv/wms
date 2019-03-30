import {connect} from "react-redux";
import CellsList from "../components/cell/CellsList";

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, null)(CellsList)
