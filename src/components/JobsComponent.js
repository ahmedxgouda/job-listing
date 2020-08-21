import React, { useEffect } from 'react';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer'

const RenderJob = ({job, state, addRole, addLevel, addLanguage, addTool,  handleClick}) => {

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
                        if (e.target.innerHTML !== state.role) {
                            handleClick(e);
                            addRole(e.target.innerHTML);
                        }
                    }
                    }>{job.role}</span><span onClick={
                        (e) => {
                            if (e.target.innerHTML !== state.level) {
                                handleClick(e);
                                addLevel(e.target.innerHTML);
                            }
                        }

                    }>{job.level}</span>{job.languages.map(lang => (<span key={lang} onClick={
                        (e) => {
                            if (!state.languages.includes(lang)) {
                                handleClick(e);
                                addLanguage(state.languages.concat(lang));
                            }
                        }

                    }>{lang}</span>))}{job.tools !== undefined ? job.tools.map(tool => (<span key={tool} onClick={
                        (e) => {
                            if (!state.tools.includes(tool)) {
                                handleClick(e);
                                addTool(state.tools.concat(tool));
                            }
                        }
                    }>{tool}</span>)): null}
            </div>
        </motion.div>
    );
}

const RenderFilterBox = ({clearFilters}) => {

    return (
        <div className="box filter-box">
            <div className="filters"></div>
            <div className="clear-btn">
                <button onClick={clearFilters}>Clear</button>
            </div>
        </div>
    );
}

const List = ({isLoading, errMess, jobs, state, addRole, addLevel, addLanguage, addTool, handleClick}) => {

    if (isLoading) {
        return (
            <Loading />
        );
    } else if (errMess) {
        return(
            <p>{errMess}</p>
        );
    } else {
        return (
            <>
                {/* eslint-disable-next-line */}
                {jobs.filter(job => {

                    // Check if items existed in state

                    const existedRole = job.role === state.role;
                    const existedLevel = job.level === state.level;
                    const existedLanguages = state.languages.every(i => job.languages.includes(i));
                    const existedTools = state.tools.every(i => job.tools.includes(i));

                    // Check if items are null or undefined

                    const isRoleNull = state.role === null;
                    const isLevelNull = state.level === null;
                    const isLanguagesUndefined = state.languages.length === 0;
                    const isToolsUndefined = state.tools.length === 0;

                    if (isRoleNull && isLevelNull && isLanguagesUndefined && isToolsUndefined) {
                        return job;

                    } else {
                        if (isLevelNull && isLanguagesUndefined && isToolsUndefined) {
                            return existedRole;

                        } else if (isRoleNull && isLanguagesUndefined && isToolsUndefined) {
                            return existedLevel;

                        } else if (isRoleNull && isLevelNull && isToolsUndefined) {

                            return existedLanguages;
                            

                        } else if (isRoleNull && isLevelNull && isLanguagesUndefined) {
                            return existedTools;

                        } else {

                            if (isLanguagesUndefined && isToolsUndefined) {
                                return existedRole && existedLevel;

                            } else if (isLevelNull && isToolsUndefined) {
                                return existedRole && existedLanguages;
                                
                            } else if (isRoleNull && isToolsUndefined) {
                                return existedLevel && existedLanguages;
                                
                            } else if (isLevelNull && isLanguagesUndefined) {
                                return existedRole && existedTools;

                            } else if (isRoleNull && isLanguagesUndefined) {
                                return existedLevel && existedTools;
                                
                            } else if (isRoleNull && isLevelNull) {
                                return existedLanguages && existedTools;
                                
                            } else {

                                if (isToolsUndefined) {
                                    return existedRole && existedLevel && existedLanguages

                                } else if (isLanguagesUndefined) {
                                    return existedRole && existedLevel && existedTools;

                                } else if (isLevelNull) {
                                    return existedRole && existedLanguages && existedTools;

                                } else if (isRoleNull) {
                                    return existedLevel && existedLanguages && existedTools;

                                }  else {
                                    return existedRole && existedLevel && existedLanguages && existedTools;
                                }
                            }
                        } 
                    }
                }).map(job => {
                    return (
                        <RenderJob key={job.id} job={job} 
                        state={state} 
                        addRole={addRole} 
                        addLevel={addLevel}
                        addLanguage={addLanguage}
                        addTool={addTool}
                        handleClick={handleClick} />
                    );
                })}
            </>
        );
        
    }
}

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

    addRole = (value) => {
        this.setState({role: value})
    }

    addLevel = (value) => {
        this.setState({level: value})
    }

    addLanguage = (value) => {
        this.setState({languages: this.state.languages.concat(value)});
    }

    addTool = (value) => {
        this.setState({tools: this.state.tools.concat(value)});
    }
    
    render() {
        return (
            <>
                <div className="container container-filter" style={{display: "none"}}>
                    {/* {console.log(this.state)} */}
                    <RenderFilterBox clearFilters={this.clearFilters} />
                </div>
                <motion.div className="container">
                    <List isLoading={this.props.isLoading}
                        errMess={this.props.errMess}
                        jobs={this.props.jobs}
                        state={this.state}
                        addRole={this.addRole}
                        addLevel={this.addLevel}
                        addLanguage={this.addLanguage}
                        addTool={this.addTool}
                        handleClick={this.handleClick} />
                </motion.div>
            </>
    );
}

}

export default Jobs;
