import type { Task } from '../store/project.store';

export interface CreateTaskDto {
    title: string;
    description?: string;
    status: 'todo' | 'in_progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    projectId: string;
}

export interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

export interface TaskFormProps {
    task?: Task;
    projectId: string;
    onClose: () => void;
}
