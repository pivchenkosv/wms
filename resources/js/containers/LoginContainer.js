import {bindActionCreators} from "redux";
import {loginWatcher, rerenderApp} from "../actions/actionCreators";
import {connect} from "react-redux";
import Login from "../components/login/Login";

const mapStateToProps = (store) => {
    return {
        user: store.user,
        message: store.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loginWatcher,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
