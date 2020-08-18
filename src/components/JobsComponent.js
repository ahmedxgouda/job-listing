import React from 'react';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';

const RenderJob = ({job}) => {
    return (
        <div className="box">
            <div className="img">
                <img src={baseUrl + job.logo} alt={job.company} />
            </div>
            <div className="text">
                <div className="info">
                    <div className="heading">
                        <h3>{job.company}</h3> {job.new ? (<span className="new">NEW!</span>): null} {job.featured ? (<span className="featured">FEATURED</span>): null}
                    </div>
                    <div className="position">
                        <h2>{job.position}</h2>
                    </div>
                    <div className="details">
                        <p>{job.postedAt} <span className="dot"></span> {job.contract} <span className="dot"></span> {job.location}</p>
                    </div>
                </div>
            </div>
            <div className="filters">
                <span>{job.role}</span><span>{job.level}</span>{job.languages.map(lang => (<span key={Math.floor(Math.random() * 40) + 20}>{lang}</span>))}{job.tools !== 'undefined' ? job.tools.map(tool => (<span key={Math.floor(Math.random() * 50) + 30}>{tool}</span>)): null}
            </div>
        </div>
    );
}

const Jobs = props => {

    const List = () => {
        if (props.isLoading) {
            return (
                <Loading />
            );
        } else if (props.errMess) {
            return(
                <p>{props.errMess}</p>
            );
        } else {
            return (
                <>
                    {props.jobs.map(job => {
                        return (
                            <RenderJob key={job.id} job={job} />
                        );
                    })}
                </>
            );
            
        }
    }
    
    return (
        <div className="container">
            <List />
        </div>
    );

}

export default Jobs;
