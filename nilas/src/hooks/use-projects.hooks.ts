import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@nila/client/src/client.gen.ts';
import type { Project } from '../store/project.store';
import { CreateProjectDto } from '../types/projects.types';
import { errorNotification, successNotification } from '../utils/notifications';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<Project[]> => {
      const response = await client.get({
        url: '/v1/projects',
      });
      return ((response.data as any)?.data as Project[]) || [];
    },
  });
};

export const useProject = (id: string) => {
  console.log('useProject called with id:', id);
  return useQuery({
    queryKey: ['projects', id],
    queryFn: async (): Promise<Project> => {
      const response = await client.get({
        url: '/v1/projects/{id}',
        path: { id }
      });
      return (response as any).data?.data as Project;
    },
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateProjectDto): Promise<Project> => {
      const response = await client.post({
        url: '/v1/projects',
        body: data
      });
      console.log('response', response);

      return ((response.data as any)?.data as Project);

    },
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      successNotification(`Project "${newProject.name}" created successfully`);
    },
    onError: (error) => {
      errorNotification('Failed to create project');
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateProjectDto> }) => {
      const response = await client.put({
        url: `/v1/projects/${id}`,
        body: data
      });
      return (response as any).data as Project;
    },
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', updatedProject.id] });
      successNotification('Project updated successfully');
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await client.delete({
        url: '/v1/projects/{id}',
        path: { id }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      successNotification('Project deleted successfully');
    },
  });
};