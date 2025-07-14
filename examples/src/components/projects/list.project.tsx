import { SimpleGrid, Text, Stack } from '@mantine/core';
import { ProjectCard } from './project-card.project';
import { useProjects } from '../../hooks/use-projects.hooks';
import { useProjectStore } from '../../store/project.store';
import type { Project } from '../../store/project.store';
import { useNavigate } from 'react-router';

interface ProjectListProps {
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

export function ProjectList({ onEditProject, onDeleteProject }: ProjectListProps) {
  const { data: projects, isLoading } = useProjects();
  const { setSelectedProject, searchQuery } = useProjectStore();
  const navigate = useNavigate();
  
  const filteredProjects = projects?.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleView = (project: Project) => {
    setSelectedProject(project);
    navigate(`/projects/${project.id}`);
  };

  if (isLoading) {
    return <Text>Loading projects...</Text>;
  }

  if (!filteredProjects.length) {
    return (
      <Stack align="center" gap="md" py="xl">
        <Text size="lg" c="dimmed">
          {searchQuery ? 'No projects match your search' : 'No projects yet'}
        </Text>
        <Text size="sm" c="dimmed">
          {searchQuery ? 'Try adjusting your search terms' : 'Create your first project to get started'}
        </Text>
      </Stack>
    );
  }

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 3 }}
      spacing="md"
    >
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onView={handleView}
          onEdit={onEditProject}
          onDelete={onDeleteProject}
        />
      ))}
    </SimpleGrid>
  );
}