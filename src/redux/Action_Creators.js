import * as Action_Types from './Action_Types';
import { baseUrl } from '../shared/baseUrl';

export const fetchJobs = () => dispatch => {
    dispatch(jobsLoading(true));
    fetch(baseUrl + 'db.json')
        .then(response => {
            if (response.ok) return response;
            else {
                let error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        }, error => {
            let errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(jobs => dispatch(addJobs(jobs)))
        .catch(error => dispatch(jobsFailed(error.message)))
}

export const jobsLoading = () => ({
    type: Action_Types.JOBS_LOADING
});

export const jobsFailed = (errMess) => ({
    type: Action_Types.JOBS_FAILED,
    payload: errMess
});

export const addJobs = (jobs) => ({
    type: Action_Types.ADD_JOBS,
    payload: jobs
});