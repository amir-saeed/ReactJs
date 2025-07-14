import { Container, Title, Text, Button, Stack, Group, Card, SimpleGrid } from '@mantine/core';
import { IconFolderPlus, IconChecklist, IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

export const HomePage = () => {
	const navigate = useNavigate();

	return (
		<Container size="md">
			<Stack gap="xl" py="xl">
				{/* Hero Section */}
				<Stack gap="md" align="center">
					<Title order={1} size="h1" ta="center">
						Welcome to Nilacares Project Manager
					</Title>
					<Text size="lg" c="dimmed" ta="center" maw={600}>
						Organize your projects and tasks efficiently. Create projects, manage tasks,
						and track progress all in one place.
					</Text>
				</Stack>

				{/* Quick Actions */}
				<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="xl">
					<Card shadow="sm" padding="lg" radius="md" withBorder>
						<Group gap="md">
							<IconFolderPlus size={32} color="var(--mantine-color-blue-6)" />
							<div style={{ flex: 1 }}>
								<Text fw={500} size="lg">Manage Projects</Text>
								<Text size="sm" c="dimmed">
									Create and organize your projects
								</Text>
							</div>
						</Group>
						<Button
							fullWidth
							mt="md"
							rightSection={<IconArrowRight size={16} />}
							onClick={() => navigate('/projects')}
						>
							Go to Projects
						</Button>
					</Card>

					<Card shadow="sm" padding="lg" radius="md" withBorder>
						<Group gap="md">
							<IconChecklist size={32} color="var(--mantine-color-green-6)" />
							<div style={{ flex: 1 }}>
								<Text fw={500} size="lg">Track Tasks</Text>
								<Text size="sm" c="dimmed">
									Manage tasks with different priorities
								</Text>
							</div>
						</Group>
						<Button
							fullWidth
							mt="md"
							variant="light"
							rightSection={<IconArrowRight size={16} />}
							onClick={() => navigate('/projects')}
						>
							View All Tasks
						</Button>
					</Card>
				</SimpleGrid>

				{/* Features */}
				<Stack gap="md" mt="xl">
					<Title order={2} ta="center">Features</Title>
					<SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
						<Card padding="md" radius="md">
							<Text fw={500} mb="xs">Project Organization</Text>
							<Text size="sm" c="dimmed">
								Create projects with descriptions and organize your work
							</Text>
						</Card>

						<Card padding="md" radius="md">
							<Text fw={500} mb="xs">Task Management</Text>
							<Text size="sm" c="dimmed">
								Track tasks with status and priority levels
							</Text>
						</Card>

						<Card padding="md" radius="md">
							<Text fw={500} mb="xs">Real-time Updates</Text>
							<Text size="sm" c="dimmed">
								See changes instantly with live data synchronization
							</Text>
						</Card>
					</SimpleGrid>
				</Stack>

				{/* Call to Action */}
				<Stack gap="md" align="center" mt="xl">
					<Text size="lg" fw={500}>Ready to get started?</Text>
					<Button
						size="lg"
						onClick={() => navigate('/projects')}
						rightSection={<IconArrowRight size={18} />}
					>
						Create Your First Project
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
};