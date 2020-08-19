import React, { useEffect } from 'react';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer'

const RenderJob = ({job}) => {

    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
    }, [controls, inView])

    return (
        <motion.div ref={ref} initial={'hidden'} animate={controls}
        variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
            transition: { transitionDuration: 2}
        }}
        className={`box${job.featured && job.new ? ' box-border' : ''}`}>
            <div className="img">
                <img src={baseUrl + job.logo} alt={job.company} />
            </div>
            <div className="text">
                <div className="info">
                    <div className="heading">
                        <h4>{job.company}</h4>{job.new ? (<span className="new">NEW!</span>): null}{job.featured ? (<span className="featured">FEATURED</span>): null}
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
                <span>{job.role}</span><span>{job.level}</span>{job.languages.map(lang => (<span key={lang}>{lang}</span>))}{job.tools !== undefined ? job.tools.map(tool => (<span key={tool}>{tool}</span>)): null}
            </div>
        </motion.div>
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
        <motion.div className="container">
            <List />
        </motion.div>
    );

}

export default Jobs;
