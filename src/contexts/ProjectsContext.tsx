import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    started_date: string;
    finished_date: string;
    purpose: string;
    link: string;
    image: string;
}

interface ProjectsContextType {
    projects: Project[];
    loadProjects: (sliderStates: Record<string, number>) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

interface ProjectsProviderProps {
    children: ReactNode;  // Typing children here
}

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    const loadProjects = async (sliderStates: Record<string, number>) => {
        console.log("Loading projects...");
        const response = await fetch("http://localhost:3000/get-projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sliderStates),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const projects = await response.json();
        setProjects(projects);
        console.log("Projects loaded...");
    };

    return (
        <ProjectsContext.Provider value={{ projects, loadProjects }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export const useProjects = () => {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error('useProjects must be used within a ProjectsProvider');
    }
    return context;
};
