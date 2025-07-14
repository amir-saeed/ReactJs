import { useState } from 'react';
import { Container, Stack, Title, Button, Group, TextInput, Modal, Text as MantineText } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { ProjectList } from '../components/projects/list.project';
import { ProjectForm } from '../components/projects/form.project';
import { useProjectStore } from '../store/project.store';
import type { Project } from '../store/project.store';
import { useDeleteProject } from '../hooks/use-projects.hooks';

export function ProjectsPage() {
    const { searchQuery, setSearchQuery } = useProjectStore();
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);
    const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const deleteProject = useDeleteProject();
    const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

    const handleCreateProject = () => {
        setEditingProject(null);
        openCreate();
    };

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        openEdit();
    };

    const handleCloseCreate = () => {
        closeCreate();
        setEditingProject(null);
    };

    const handleCloseEdit = () => {
        closeEdit();
        setEditingProject(null);
    };

    const handleDelete = (project: Project) => {
        setProjectToDelete(project);
        openDelete();
    };

    const confirmDelete = () => {
        console.log('Deleting project:', projectToDelete);
        if (projectToDelete) {
            deleteProject.mutate(projectToDelete.id);
            setProjectToDelete(null);
            closeDelete();
        }
    };

    return (
        <Container size="xl">
            <Stack gap="lg">
                <Title order={1}>Project Manager</Title>

                {/* Search and Create */}
                <Group justify="space-between">
                    <TextInput
                        placeholder="Search projects..."
                        leftSection={<IconSearch size={16} />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ flex: 1, maxWidth: 400 }}
                    />
                    <Button
                        leftSection={<IconPlus size={16} />}
                        onClick={handleCreateProject}
                    >
                        New Project
                    </Button>
                </Group>

                {/* Project List */}
                <ProjectList
                    onEditProject={handleEditProject}
                    onDeleteProject={handleDelete}
                />

                {/* Create Project Modal */}
                <Modal
                    opened={createOpened}
                    onClose={handleCloseCreate}
                    title="Create New Project"
                    size="md"
                >
                    <ProjectForm onClose={handleCloseCreate} />
                </Modal>

                {/* Edit Project Modal */}
                <Modal
                    opened={editOpened}
                    onClose={handleCloseEdit}
                    title="Edit Project"
                    size="md"
                >
                    {editingProject && (
                        <ProjectForm
                            project={editingProject}
                            onClose={handleCloseEdit}
                        />
                    )}
                </Modal>

                <Modal
                    opened={deleteOpened}
                    onClose={closeDelete}
                    title="Delete Project"
                    size="sm"
                >
                    <Stack>
                        <MantineText size="sm">
                            Are you sure you want to delete "{projectToDelete?.name}"? This action cannot be undone.
                        </MantineText>
                        <Group justify="flex-end" mt="md">
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