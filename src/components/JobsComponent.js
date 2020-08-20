import React, { useEffect } from 'react';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer'

class Jobs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            role: null,
            languages: [],
            tools: [],
            level: null
        }
    }

    handleClick = (event) => {
        const containerFilter = document.querySelector('.container-filter');
        const filters = document.querySelector('.filter-box .filters');
        const span = document.createElement('span');

        span.innerHTML = event.target.innerHTML;

        span.addEventListener('click', (e) => {

            if (e.target.innerHTML === this.state.role) {
                this.setState({role: null});
                
            } else if (e.target.innerHTML === this.state.level) {
                this.setState({level: null});

            } else if (this.state.languages.includes(e.target.innerHTML)) {
                const position = this.state.languages.indexOf(e.target.innerHTML);
                const languages = [...this.state.languages];
                languages.splice(position, 1);
                this.setState({languages: languages});

            } else if (this.state.tools.includes(e.target.innerHTML)) {
                const position = this.state.tools.indexOf(e.target.innerHTML);
                const tools = [...this.state.tools];
                tools.splice(position, 1);
                this.setState({tools: tools});
            }
            span.remove();
            const spans = document.querySelectorAll('.filter-box .filters span');
            if (spans.length === 0) containerFilter.style.display = 'none';
        });
        filters.appendChild(span);

        document.querySelector('.filter-box').appendChild(filters);
        if (containerFilter.style.display === 'none') {
            containerFilter.style.display = 'flex'; 
        }
    }

    clearFilters = () => {
        this.setState({
            role: null,
            languages: [],
            tools: [],
            level: null
        });
        
        const spans = document.querySelectorAll('.filter-box .filters span');

        for (let span of spans) {
            span.remove();
        }
        document.querySelector('.container-filter').style.display = 'none'
    }

    RenderJob = ({job}) => {

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
                    <span onClick={
                        (e) => {
                            this.handleClick(e);
                            this.setState({role: e.target.innerHTML});
                        }
                        }>{job.role}</span><span onClick={
                            (e) => {
                            this.handleClick(e);
                            this.setState({level: e.target.innerHTML});
                            }
                        }>{job.level}</span>{job.languages.map(lang => (<span key={lang} onClick={
                            (e) => {
                                this.handleClick(e);
                                this.setState({languages: this.state.languages.concat(lang)});
                            }
                        }>{lang}</span>))}{job.tools !== undefined ? job.tools.map(tool => (<span key={tool} onClick={
                            (e) => {
                                this.handleClick(e);
                                this.setState({tools: this.state.tools.concat(tool)});
                            }
                        }>{tool}</span>)): null}
                </div>
            </motion.div>
        );
    }
    

    RenderFilterBox = () => {

        return (
            <div className="box filter-box">
                <div className="filters"></div>
                <div className="clear-btn">
                    <button onClick={this.clearFilters}>Clear</button>
                </div>
            </div>
        );
    }

    List = () => {
        if (this.props.isLoading) {
            return (
                <Loading />
            );
        } else if (this.props.errMess) {
            return(
                <p>{this.props.errMess}</p>
            );
        } else {
            return (
                <>
                    {/* eslint-disable-next-line */}
                    {this.props.jobs.filter(job => {
                        if (this.state.role === null && this.state.level === null && this.state.languages.length === 0 && this.state.tools.length === 0) {
                            return job;
                        } else {
                            if (this.state.level === null && this.state.languages.length === 0 && this.state.tools.length === 0) {
                                return job.role === this.state.role;

                            } else if (this.state.role === null && this.state.languages.length === 0 && this.state.tools.length === 0) {
                                return job.level === this.state.level;

                            } else if (this.state.role === null && this.state.level === null && this.state.tools.length === 0) {

                                return this.state.languages.every(i => job.languages.includes(i))
                                

                            } else if (this.state.role === null && this.state.level === null && this.state.languages.length === 0) {
                                return this.state.tools.every(i => job.tools.includes(i))
                            } else {

                                if (this.state.languages.length === 0 && this.state.tools.length === 0) {
                                    return job.role === this.state.role && job.level === this.state.level;

                                } else if (this.state.level === null && this.state.tools.length === 0) {
                                    return job.role === this.state.role && this.state.languages.every(i => job.languages.includes(i));
                                    
                                } else if (this.state.role === null && this.state.tools.length === 0) {
                                    return job.level === this.state.level && this.state.languages.every(i => job.languages.includes(i));
                                    
                                } else if (this.state.level === null && this.state.languages.length === 0) {
                                    return job.role === this.state.role && this.state.tools.every(i => job.tools.includes(i));

                                } else if (this.state.role === null && this.state.languages.length === 0) {
                                    return job.level === this.state.level && this.state.tools.every(i => job.tools.includes(i));
                                    
                                } else if (this.state.role === null && this.state.level === null) {
                                    return this.state.languages.every(i => job.languages.includes(i)) && this.state.tools.every(i => job.tools.includes(i));
                                    
                                } else {

                                    if (this.state.tools.length === 0) {
                                        return job.role === this.state.role && job.level === this.state.level && this.state.languages.every(i => job.languages.includes(i))

                                    } else if (this.state.languages.length === 0) {
                                        return job.role === this.state.role && job.level === this.state.level && this.state.tools.every(i => job.tools.includes(i));

                                    } else if (this.state.level === null) {
                                        return job.role === this.state.role && this.state.languages.every(i => job.languages.includes(i)) && this.state.tools.every(i => job.tools.includes(i));

                                    } else if (this.state.role === null) {
                                        return job.level === this.state.level && this.state.languages.every(i => job.languages.includes(i)) && this.state.tools.every(i => job.tools.includes(i));

                                    }  else {
                                        return job.role === this.state.role && job.level === this.state.level && this.state.languages.every(i => job.languages.includes(i)) && this.state.tools.every(i => job.tools.includes(i));
                                    }
                                }
                            } 
                        }
                    }).map(job => {
                        return (
                            <this.RenderJob key={job.id} job={job} />
                        );
                    })}
                </>
            );
            
        }
    }
    
    render() {
        return (
            <>
                <div className="container container-filter" style={{display: "none"}}>
                    {/* {console.log(this.state)} */}
                    <this.RenderFilterBox />
                </div>
                <motion.div className="container">
                    <this.List />
                </motion.div>
            </>
    );
}

}

export default Jobs;
