import {setTask, unsetTask} from "../actions/task";
import {connect} from "react-redux";
import TasksList from "../components/task/TasksList";

const mapStateToProps = (store, ownProps) => {
    return {
        task: store.task.task,
        store: store,
        user: store.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTask: (task) => setTask(task)(dispatch),
        unsetTask: () => unsetTask()(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
