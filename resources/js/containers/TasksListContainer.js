import {connect} from "react-redux";
import TasksList from "../components/task/TasksList";
import {bindActionCreators} from "redux";
import {loadTasks, loadTasksWatcher, setTask, unsetTask} from "../actions/actionCreators";

const mapStateToProps = (store, ownProps) => {
    return {
        task: store.task.task,
        tasks: store.tasks.tasks,
        store: store,
        user: store.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loadTasksWatcher,
        loadTasks,
        setTask,
        unsetTask
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
