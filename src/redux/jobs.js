import * as Action_Types from './Action_Types';

export const Jobs = (state = {
    isLoading: true, errMess: null, jobs: []
    }, action) => {

        switch(action.type) {
            case Action_Types.ADD_JOBS:
                return {...state, isLoading: false, errMess: null, jobs: action.payload}

            case Action_Types.JOBS_LOADING:
                return {...state, isLoading: true, errMess: null, jobs: []}

            case Action_Types.JOBS_FAILED:
                return {...state, isLoading: false, errMess: action.payload, jobs: []}

            default:
                return state;
        }
}