import React, {useEffect, useState} from 'react';
import {SliderState, useSlider} from './SliderContext';
import ProjectCardComponent from "./ProjectCardComponent.tsx";
import {Project} from "../types.ts";


interface ProjectsContainerProps {
    type: keyof SliderState; // "featured" or "future"
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({type}) => {
    const {sliderState} = useSlider();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetchProjects();
    }, [sliderState[type]]);

    const fetchProjects = async () => {
        const response = await fetch(`http://localhost:3000/api/get-projects?type=${type}&state=${sliderState[type]}`);
        const data = await response.json();
        setProjects(data);
    };

    return (
        <div className={`cards-container`}>
            {projects.map(project => (
                <ProjectCardComponent key={project.id} project={project}/>
            ))}
        </div>
    );
};

export default ProjectsContainer;
