import { create } from 'zustand';

export interface Project {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: 'todo' | 'in_progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    projectId: number;
    createdAt: string;
    updatedAt: string;
}

interface ProjectState {
    selectedProject: Project | null;
    filter: 'all' | 'todo' | 'in_progress' | 'done';
    searchQuery: string;

    setSelectedProject: (project: Project | null) => void;
    setFilter: (filter: ProjectState['filter']) => void;
    setSearchQuery: (query: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
    selectedProject: null,
    filter: 'all',
    searchQuery: '',

    setSelectedProject: (selectedProject) => set({ selectedProject }),
    setFilter: (filter) => set({ filter }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),
}));