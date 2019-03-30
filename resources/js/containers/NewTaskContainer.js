import {setTask, unsetTask} from "../actions/task";
import {connect} from "react-redux";
import NewTask from "../components/task/NewTask";

const mapStateToProps = (store, ownProps) => {
    return {
        task: store.task.task
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTask: (task) => setTask(task)(dispatch),
        unsetTask: () => unsetTask()(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTask)
