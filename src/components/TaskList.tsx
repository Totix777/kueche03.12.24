import React from 'react';
import { Checkbox, Text, Stack, Group, Paper } from '@mantine/core';
import { useStore } from '../store/useStore';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  title: string;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, title }) => {
  const toggleTask = useStore(state => state.toggleTask);

  return (
    <Paper shadow="xs" p="md" mb="md">
      <Text size="lg" fw={500} mb="md">{title}</Text>
      <Stack>
        {tasks.map(task => (
          <Group key={task.id}>
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              label={task.name}
            />
          </Group>
        ))}
      </Stack>
    </Paper>
  );
};