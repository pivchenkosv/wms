import {bindActionCreators} from "redux";
import {logoutWatcher, rerenderApp} from "../actions/actionCreators";
import {connect} from "react-redux";
import Header from "../components/Header";

const mapStateToProps = (store, ownProps) => {
    return {
        user: store.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logoutWatcher,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
