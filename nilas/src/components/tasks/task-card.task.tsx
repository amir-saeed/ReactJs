import { Card, Text, Badge, Group, ActionIcon, Select } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useUpdateTask } from '../../hooks/use-tasks.hooks';
import type { Task } from '../../store/project.store';
import { TaskCardProps } from '../../types/tasks.types';

const statusColors = {
    todo: 'gray',
    in_progress: 'yellow',
    done: 'green',
};

const priorityColors = {
    low: 'blue',
    medium: 'orange',
    high: 'red',
};

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    const updateTask = useUpdateTask();

    const handleStatusChange = (status: string) => {
        updateTask.mutate({
            id: task.id,
            data: { status: status as Task['status'] }
        });
    };

    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
                <Text fw={500}>{task.title}</Text>
                <Group gap="xs">
                    <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => onEdit(task)}
                    >
                        <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => onDelete(task)}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            </Group>

            {task.description && (
                <Text size="sm" c="dimmed" mb="md">
                    {task.description}
                </Text>
            )}

            <Group justify="space-between" mb="md">
                <Badge color={priorityColors[task.priority]} variant="light">
                    {task.priority} priority
                </Badge>
                <Badge color={statusColors[task.status]} variant="filled">
                    {task.status.replace('_', ' ')}
                </Badge>
            </Group>

            <Select
                label="Status"
                value={task.status}
                onChange={handleStatusChange}
                data={[
                    { value: 'todo', label: 'To Do' },
                    { value: 'in_progress', label: 'In Progress' },
                    { value: 'done', label: 'Done' },
                ]}
                size="xs"
            />
        </Card>
    );
}