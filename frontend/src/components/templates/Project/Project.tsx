import React, { useState } from 'react';
import {AgricultureProject} from './Agriculture';
import {SeaProject} from './Seas';
import {ForestProject} from './Forest';
import {CharityProject} from './Charity';
import {EducationProject} from './Education';
import { ProjectContainer, DiscoverButton } from './ProjectContainer.styled';

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
            <DiscoverButton onClick={toggleProjectVisibility}>
                {isProjectVisible ? 'Hide Project' : 'Show Project Details'}
            </DiscoverButton>
            {ProjectComponent && (
                <ProjectContainer isVisible={isProjectVisible}>
                    <ProjectComponent />
                </ProjectContainer>
            )}
        </div>
    );
};
