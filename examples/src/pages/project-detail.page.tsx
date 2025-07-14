import { useParams, useNavigate } from 'react-router';
import { Container, Stack, Text, ActionIcon, Group, Title, Button, Badge, Select, TextInput, SimpleGrid, Modal } from '@mantine/core';
import { IconArrowLeft, IconPlus, IconSearch, IconFilter } from '@tabler/icons-react';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useProject } from '../hooks/use-projects.hooks';
import { useTasks } from '../hooks/use-tasks.hooks';
import { TaskCard } from '../components/tasks/task-card.task';
import { TaskForm } from '../components/tasks/form.task';
import type { Task } from '../store/project.store';
import { errorNotification } from '../utils/notifications';

export function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [filter, setFilter] = useState<'all' | 'todo' | 'in_progress' | 'done'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

    const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);
    const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);

    const projectId = id ? id : '';
    const { data: project, isLoading: projectLoading } = useProject(projectId);
    const { data: tasks, isLoading: tasksLoading } = useTasks(projectId);

    if (projectLoading) {
        return <Container><Text>Loading project...</Text></Container>;
    }

    if (!project) {
        return <Container><Text>Project not found</Text></Container>;
    }

    const filteredTasks = tasks?.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || task.status === filter;
        return matchesSearch && matchesFilter;
    }) || [];

    const taskStats = {
        total: tasks?.length || 0,
        todo: tasks?.filter(t => t.status === 'todo').length || 0,
        in_progress: tasks?.filter(t => t.status === 'in_progress').length || 0,
        done: tasks?.filter(t => t.status === 'done').length || 0,
    };

    const handleCreateTask = () => {
        setEditingTask(null);
        openCreate();
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        openEdit();
    };

    const handleDeleteTask = (task: Task) => {
        setTaskToDelete(task);
        openDelete();
    };

    const confirmDelete = () => {
        if (taskToDelete) {
            errorNotification(`"${taskToDelete.title}" has been deleted`)
        }
        closeDelete();
        setTaskToDelete(null);
    };

    return (
        <Container size="xl">
            <Stack gap="lg">
                {/* Header */}
                <Group justify="space-between">
                    <Group gap="md">
                        <ActionIcon
                            variant="subtle"
                            onClick={() => navigate('/projects')}
                        >
                            <IconArrowLeft size={18} />
                        </ActionIcon>
                        <div>
                            <Title order={1}>{project.name}</Title>
                            {project.description && (
                                <Text size="sm" c="dimmed">{project.description}</Text>
                            )}
                        </div>
                    </Group>
                    <Button
                        leftSection={<IconPlus size={16} />}
                        onClick={handleCreateTask}
                    >
                        Add Task
                    </Button>
                </Group>

                {/* Stats */}
                <Group gap="lg">
                    <Badge size="lg" variant="light" color="blue">
                        Total: {taskStats.total}
                    </Badge>
                    <Badge size="lg" variant="light" color="gray">
                        To Do: {taskStats.todo}
                    </Badge>
                    <Badge size="lg" variant="light" color="yellow">
                        In Progress: {taskStats.in_progress}
                    </Badge>
                    <Badge size="lg" variant="light" color="green">
                        Done: {taskStats.done}
                    </Badge>
                </Group>

                {/* Filters */}
                <Group gap="md">
                    <TextInput
                        placeholder="Search tasks..."
                        leftSection={<IconSearch size={16} />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <Select
                        placeholder="Filter by status"
                        leftSection={<IconFilter size={16} />}
                        value={filter}
                        onChange={(value) => setFilter(value as any)}
                        data={[
                            { value: 'all', label: 'All Tasks' },
                            { value: 'todo', label: 'To Do' },
                            { value: 'in_progress', label: 'In Progress' },
                            { value: 'done', label: 'Done' },
                        ]}
                        w={200}
                    />
                </Group>

                {/* Tasks */}
                {tasksLoading ? (
                    <Text>Loading tasks...</Text>
                ) : !filteredTasks.length ? (
                    <Stack align="center" gap="md" py="xl">
                        <Text size="lg" c="dimmed">
                            {searchQuery || filter !== 'all' ? 'No tasks match your criteria' : 'No tasks yet'}
                        </Text>
                    </Stack>
                ) : (
                    <SimpleGrid
                        cols={{ base: 1, md: 2, lg: 3 }}
                        spacing="md"
                    >
                        {filteredTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </SimpleGrid>
                )}

                {/* Create Task Modal */}
                <Modal
                    opened={createOpened}
                    onClose={closeCreate}
                    title="Create New Task"
                    size="md"
                >
                    <TaskForm
                        projectId={projectId}
                        onClose={closeCreate}
                    />
                </Modal>

                {/* Edit Task Modal */}
                <Modal
                    opened={editOpened}
                    onClose={closeEdit}
                    title="Edit Task"
                    size="md"
                >
                    {editingTask && (
                        <TaskForm
                            task={editingTask}
                            projectId={projectId}
                            onClose={closeEdit}
                        />
                    )}
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    opened={deleteOpened}
                    onClose={closeDelete}
                    title="Delete Task"
                    size="sm"
                >
                    <Stack gap="md">
                        <Text size="sm">
                            Are you sure you want to delete "{taskToDelete?.title}"? This action cannot be undone.
                        </Text>
                        <Group justify="flex-end" gap="xs">
                            <Button variant="default" onClick={closeDelete}>
                                Cancel
                            </Button>
                            <Button color="red" onClick={confirmDelete}>
                                Delete
                            </Button>
                        </Group>
                    </Stack>
                </Modal>
            </Stack>
        </Container>
    );
}