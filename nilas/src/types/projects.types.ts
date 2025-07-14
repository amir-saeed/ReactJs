import type { Project } from '../store/project.store';

export interface ProjectCardProps {
    project: Project;
    onView: (project: Project) => void;
    onEdit: (project: Project) => void;
    onDelete: (project: Project) => void;
}

export interface ProjectFormProps {
    project?: Project;
    onClose: () => void;
}

export interface CreateProjectDto {
    name: string;
    description?: string;
}