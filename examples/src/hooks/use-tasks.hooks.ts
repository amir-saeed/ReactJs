import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@nila/client/src/client.gen.ts';
import type { Task } from '../store/project.store';
import { CreateTaskDto } from '../types/tasks.types';
import { successNotification } from '../utils/notifications';

export const useTasks = (projectId?: string) => {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async (): Promise<Task[]> => {
      const response = await client.get({
        url: `/v1/projects/${projectId}/tasks`,
        query: { projectId }
      });

      return Array.isArray((response as any).data?.data) ? (response as any).data.data as Task[] : [];
    },
    enabled: !!projectId,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, data }: { projectId: string; data: CreateTaskDto }): Promise<Task> => {
      const response = await client.post({
        url: `/v1/projects/${projectId}/tasks`,
        body: data
      });
      return (response as any).data as Task;
    },
    onSuccess: (newTask) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', newTask.projectId] });
      successNotification(`"${newTask.title}" added successfully`);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<CreateTaskDto> }) => {
      const response = await client.put({
        url: `/v1/tasks/${id}`,
        body: data
      });
      return (response as any).data as Task;

    },
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', updatedTask.projectId] });
      successNotification('Task updated successfully');
    },
  });
};