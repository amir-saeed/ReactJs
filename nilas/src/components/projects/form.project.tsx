import { Button, TextInput, Textarea, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateProject, useUpdateProject } from '../../hooks/use-projects.hooks';
import { ProjectFormProps } from '../../types/projects.types';

export function ProjectForm({ project, onClose }: ProjectFormProps) {
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  
  const form = useForm({
    initialValues: {
      name: project?.name || '',
      description: project?.description || '',
    },
    validate: {
      name: (value) => (value.length < 1 ? 'Name is required' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (project) {
        await updateProject.mutateAsync({ id: project.id, data: values });
      } else {
        await createProject.mutateAsync(values);
      }
      onClose();
    } catch (error) {
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Project Name"
          placeholder="Enter project name"
          {...form.getInputProps('name')}
          required
        />
        
        <Textarea
          label="Description"
          placeholder="Enter project description (optional)"
          minRows={3}
          {...form.getInputProps('description')}
        />

        <Button 
          type="submit" 
          loading={createProject.isPending || updateProject.isPending}
        >
          {project ? 'Update Project' : 'Create Project'}
        </Button>
      </Stack>
    </form>
  );
}