import React from 'react';
import { fetchJobs } from '../redux/Action_Creators';
import { connect } from 'react-redux';
import Header from './HeaderComponent';
import Jobs from './JobsComponent';

const mapStateToProps = state => {
    return {
      jobs: state.jobs
    }
}

const mapDispatchToProps = dispatch => ({
    fetchJobs: () => {dispatch(fetchJobs());}    
});

class Main extends React.Component {
    componentDidMount() {
        this.props.fetchJobs();
    }

    render() {
        return (
            <>
                <Header />
                <Jobs jobs={this.props.jobs.jobs}
                    isLoading={this.props.jobs.isLoading}
                    errMess={this.props.jobs.errMess} />
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
