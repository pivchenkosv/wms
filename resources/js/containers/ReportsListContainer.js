import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadReportsWatcher} from "../actions/reports";
import ReportsList from "../components/report/ReportsList";

const mapStateToProps = (store, ownProps) => {
    return {
        reports: store.reports
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loadReportsWatcher,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsList);
