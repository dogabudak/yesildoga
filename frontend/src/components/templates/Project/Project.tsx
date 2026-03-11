import React from 'react';
import { AgricultureProject } from './Agriculture';
import { SeaProject } from './Seas';
import { ForestProject } from './Forest';
import { CharityProject } from './Charity';
import { EducationProject } from './Education';

interface ProjectTabProps {
  projectName: string;
  goalId: string;
}

const ProjectComponents: { [key: string]: React.FC } = {
  Agriculture: AgricultureProject,
  Seas: SeaProject,
  Forest: ForestProject,
  Charity: CharityProject,
  Education: EducationProject,
};

export const ProjectTab: React.FC<ProjectTabProps> = ({ projectName }) => {
  const ProjectComponent = ProjectComponents[projectName];

  if (!ProjectComponent) return null;

  return <ProjectComponent />;
};
