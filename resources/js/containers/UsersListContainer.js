import {bindActionCreators} from "redux";
import {createUserWatcher, deleteUserWatcher, loadUsersWatcher} from "../actions/actionCreators";
import {connect} from "react-redux";
import UsersList from "../components/user/UsersList";

const mapStateToProps = (store) => {
    return {
        user: store.user,
        users: store.users,
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loadUsersWatcher,
        createUserWatcher,
        deleteUserWatcher,
        // add other watcher sagas to this object to map them to props
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
