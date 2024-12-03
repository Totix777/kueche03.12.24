import React from 'react';
import { Group, Text, Button } from '@mantine/core';
import { useAuthStore } from '../store/useAuthStore';
import { getCurrentUsername } from '../services/auth';

export const UserInfo: React.FC = () => {
  const { logout } = useAuthStore();
  const username = getCurrentUsername();

  return (
    <Group gap="md">
      <Text>Angemeldet als: <strong>{username}</strong></Text>
      <Button variant="light" onClick={logout}>Abmelden</Button>
    </Group>
  );
};