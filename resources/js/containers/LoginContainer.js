import {bindActionCreators} from "redux";
import {loginWatcher} from "../actions/actionCreators";
import {connect} from "react-redux";
import Login from "../components/login/Login";

const mapStateToProps = (store) => {
    console.log(store)
    return {
        user: store.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loginWatcher
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
