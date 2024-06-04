import React, {useEffect, useState, useCallback} from 'react';
import {SliderState, useSlider} from './SliderContext';
import ProjectCardComponent from "./ProjectCardComponent";
import {Project} from "../types";

interface ProjectsContainerProps {
    type: keyof SliderState; // "featured" or "future"
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({type}) => {
    const {sliderState} = useSlider();
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/get-projects?type=${type}&state=${sliderState[type]}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProjects(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred.');
            }
            console.error('Failed to fetch projects:', err);
        }
    }, [type, sliderState]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <div className={`cards-container`}>
            {error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
            ) : (
                projects.map(project => (
                    <ProjectCardComponent key={project.id} project={project}/>
                ))
            )}
        </div>
    );
};

export default ProjectsContainer;
