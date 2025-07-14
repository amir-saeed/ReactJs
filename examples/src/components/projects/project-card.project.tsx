import { Card, Text, Badge, Group, ActionIcon, Menu } from '@mantine/core';
import { IconDots, IconEdit, IconTrash, IconEye } from '@tabler/icons-react';
import { ProjectCardProps } from '../../types/projects.types';

export function ProjectCard({ project, onView, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500} size="lg">{project.name}</Text>
        <Menu shadow="md" width={120}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item 
              leftSection={<IconEye size={14} />}
              onClick={() => onView(project)}
            >
              View
            </Menu.Item>
            <Menu.Item 
              leftSection={<IconEdit size={14} />}
              onClick={() => onEdit(project)}
            >
              Edit
            </Menu.Item>
            <Menu.Item 
              leftSection={<IconTrash size={14} />}
              color="red"
              onClick={() => onDelete(project)}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      {project.description && (
        <Text size="sm" c="dimmed" mb="md">
          {project.description}
        </Text>
      )}

      <Group justify="space-between">
        <Badge color="blue" variant="light">
          Project #{project.id}
        </Badge>
        <Text size="xs" c="dimmed">
          {new Date(project.createdAt).toLocaleDateString()}
        </Text>
      </Group>
    </Card>
  );
}