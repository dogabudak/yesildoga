import { useEffect, useState } from 'react';
import { SearchBar } from '@molecules/SearchBar/SearchBar';

interface ProjectTabProps {
    projectName: string; // without extension
    goalId: string;
}

export const ProjectTab: React.FC<ProjectTabProps> = ({ projectName, goalId }) => {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadHtml = async () => {
            try {
                console.log(`/projects/${projectName}/index.html`);
                const res = await fetch(`/projects/${projectName}/index.html`);
                const text = await res.text();
                setHtmlContent(text);
            } catch (err) {
                setError(true);
                console.error(`Failed to load HTML: ${projectName}/index.html`, err);
            }
        };

        loadHtml();
    }, [projectName]);

    return (
        <div>
            <SearchBar goalId={goalId} />
            {error && <p>❌ Could not load content.</p>}
            {!error && htmlContent && (
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            )}
        </div>
    );
};
