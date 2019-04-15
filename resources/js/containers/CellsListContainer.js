import {connect} from "react-redux";
import CellsList from "../components/cell/CellsList";
import {bindActionCreators} from "redux";
import {loadCellsAction, loadCellsWatcher} from "../actions/cells";

const mapStateToProps = (store) => {
    return {
        user: store.user,
        cells: store.cells
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loadCellsWatcher,
        loadCellsAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CellsList)
