import { Button, TextInput, Textarea, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateTask, useUpdateTask } from '../../hooks/use-tasks.hooks';
import { TaskFormProps } from '../../types/tasks.types';

export function TaskForm({ task, projectId, onClose }: TaskFormProps) {
    const createTask = useCreateTask();
    const updateTask = useUpdateTask();

    const form = useForm({
        initialValues: {
            title: task?.title || '',
            description: task?.description || '',
            status: task?.status || 'todo',
            priority: task?.priority || 'medium',
        },
        validate: {
            title: (value) => (value.length < 1 ? 'Title is required' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            if (task) {
                await updateTask.mutateAsync({ id: task.id, data: values });
            } else {
                // await createTask.mutateAsync({ ...values, projectId });
                await createTask.mutateAsync({ projectId, data: { ...values, projectId }  });
            }
            onClose();
        } catch (error) {
        }
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
                <TextInput
                    label="Task Title"
                    placeholder="Enter task title"
                    {...form.getInputProps('title')}
                    required
                />

                <Textarea
                    label="Description"
                    placeholder="Enter task description (optional)"
                    minRows={3}
                    {...form.getInputProps('description')}
                />

                <Select
                    label="Status"
                    {...form.getInputProps('status')}
                    data={[
                        { value: 'todo', label: 'To Do' },
                        { value: 'in_progress', label: 'In Progress' },
                        { value: 'done', label: 'Done' },
                    ]}
                />

                <Select
                    label="Priority"
                    {...form.getInputProps('priority')}
                    data={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' },
                    ]}
                />

                <Button
                    type="submit"
                    loading={createTask.isPending || updateTask.isPending}
                >
                    {task ? 'Update Task' : 'Create Task'}
                </Button>
            </Stack>
        </form>
    );
}