import React, {useEffect, useState} from 'react';
import {Project} from '../types';
import {IMAGE_PATH} from "../constants";
import CloseButton from "./buttons/CloseButton.tsx";
import NoImageIcon from "../assets/icons/NoImageIcon.tsx";


interface ProjectCardComponentProps {
    project: Project;
}

const ProjectCardComponent: React.FC<ProjectCardComponentProps> = ({project}) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        if (!expanded) {
            document.body.style.overflow = 'hidden';  // Lock scroll when card is opened
        } else {
            document.body.style.overflow = 'hidden auto';  // Unlock scroll when card is closed
        }
        setExpanded(!expanded);
    };

    // Ensure that the scroll is unlocked if the component unmounts while expanded
    useEffect(() => {
        return () => {
            if (expanded) {
                document.body.style.overflow = 'hidden auto';
            }
        };
    }, [expanded]);

    return (
        <>
            <div className={`card ${expanded ? 'opened' : ''}`} onClick={!expanded ? handleToggle : undefined}>
                <div className="card-image-container">
                    {project.image ? (
                        <img src={`${IMAGE_PATH}/${project.image + ".png" || NoImageIcon}`} alt={project.title}
                             className={`card-image ${project.link ? "linked" : ""}`}/>
                    ) : (
                        <div className="no-image-icon">
                            <NoImageIcon/>
                        </div>

                    )}
                    {project.link ? (
                    <a href={project.link} target="_blank" onClick={e => e.stopPropagation()}>Visit Website
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.78 23.91">
                            <polyline points="1.5 1 11.78 12.1 1 22.91" fill="none" stroke="currentColor"
                                      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                    </a>
                    ) : null}
                </div>
                {/* If the card is opened show the data-container, else show the description-container*/}
                {expanded ? (
                    <div className="data-container">
                        <div className="info-section">
                            <h3>{project.title}</h3>
                            <p>Started
                                on: {project.started_date ? new Date(project.started_date).toLocaleDateString() : 'unstarted'}</p>
                            <p>Finished
                                on: {project.finished_date ? new Date(project.finished_date).toLocaleDateString() : 'unfinished'}</p>
                            <div className="tags-container">
                                Tags: {project.tags.split(', ').map(tag => <span key={tag}
                                                                                 className="tag">{tag}</span>)}
                            </div>
                        </div>
                        <div className="description">
                            <h4>Description</h4>
                            <p>{project.description}</p>
                        </div>
                    </div>
                ) : (
                    <div className="project-description-container">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                )}
            </div>

            {/*Show the close button as a sibling when the card is opened*/}
            {/*<button ref={nodeRef} className="close-button" onClick={(e) => {*/}
            {/*    e.stopPropagation();*/}
            {/*    setExpanded(false);*/}
            {/*}}>*/}
            {/*    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">*/}
            {/*        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*           strokeWidth="3">*/}
            {/*            <path d="M1 1l20 20M1 21l20-20"/>*/}
            {/*        </g>*/}
            {/*    </svg>*/}
            {/*</button>*/}
            <CloseButton expanded={expanded} setExpanded={setExpanded}/>
        </>
    );
};

export default ProjectCardComponent;
