import { SearchBar } from '@molecules/SearchBar/SearchBar';
import {AgricultureProject} from './Agriculture';
import {SeaProject} from './Seas';
import {ForestProject} from './Forest';
import {CharityProject} from './Charity';
import {EducationProject} from './Education';

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
// TODO this is ugly as fuck, but it works for now
export const ProjectTab: React.FC<ProjectTabProps> = ({ projectName, goalId }) => {
    const ProjectComponent = ProjectComponents[projectName];

    return (
        <div>
            <SearchBar goalId={goalId} />
            {ProjectComponent ? (
                <ProjectComponent />
            ) : (
                <p>❌ Project not found.</p>
            )}
        </div>
    );
};
