import React from 'react';
import { fetchJobs } from '../redux/Action_Creators';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      jobs: state.jobs
    }
}

const mapDispatchToProps = dispatch => ({
    fetchJobs: () => {dispatch(fetchJobs);}    
});

class Main extends React.Component {
    componentDidMount() {
        this.props.fetchJobs();
    }

    render() {
        return (
            <div>Test</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);