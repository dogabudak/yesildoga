import React, { useState } from 'react';
import { SearchBar } from '@molecules/SearchBar/SearchBar';
import {AgricultureProject} from './Agriculture';
import {SeaProject} from './Seas';
import {ForestProject} from './Forest';
import {CharityProject} from './Charity';
import {EducationProject} from './Education';
import { ProjectContainer } from './ProjectContainer.styled';

interface ProjectTabProps {
    projectName: string; // without extension
    goalId: string;
}

const ProjectComponents: { [key: string]: React.FC } = {
    Agriculture: AgricultureProject,
    Seas: SeaProject,
    Forest: ForestProject,
    Charity: CharityProject,
    Education: EducationProject,
};

export const ProjectTab: React.FC<ProjectTabProps> = ({ projectName, goalId }) => {
    const [isProjectVisible, setProjectVisible] = useState(false);
    const ProjectComponent = ProjectComponents[projectName];

    const toggleProjectVisibility = () => {
        setProjectVisible(!isProjectVisible);
    };

    return (
        <div>
            <SearchBar goalId={goalId} />
            <button onClick={toggleProjectVisibility}>
                {isProjectVisible ? 'Hide Project' : 'Show Project'}
            </button>
            {isProjectVisible && ProjectComponent && (
                <ProjectContainer>
                    <ProjectComponent />
                </ProjectContainer>
            ) }
        </div>
    );
};
