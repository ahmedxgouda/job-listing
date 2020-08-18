import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Jobs } from './jobs';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
    const store = createStore(combineReducers({
        jobs: Jobs
    }), 
        applyMiddleware(thunk)
    );
    
    return store;
}