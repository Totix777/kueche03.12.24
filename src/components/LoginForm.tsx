import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Text, LoadingOverlay } from '@mantine/core';
import { useAuthStore } from '../store/useAuthStore';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Paper shadow="md" p="xl" w={400} mx="auto" mt={100} pos="relative">
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
      <Title order={2} mb="lg" ta="center">DRK Küche - Anmeldung</Title>
      
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Mitarbeiter Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          mb="md"
          placeholder="Name eingeben"
        />
        
        <PasswordInput
          label="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mb="xl"
          placeholder="Passwort eingeben"
        />
        
        {error && (
          <Text c="red" mb="md" size="sm">
            {error}
          </Text>
        )}
        
        <Button
          type="submit"
          fullWidth
          loading={loading}
        >
          Anmelden
        </Button>
      </form>
    </Paper>
  );
};