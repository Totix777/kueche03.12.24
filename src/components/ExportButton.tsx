import React from 'react';
import { Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { useStore } from '../store/useStore';
import { exportToExcel } from '../utils/excelExport';

export const ExportButton: React.FC = () => {
  const { tasks, temperatures, foodItems } = useStore();

  const handleExport = () => {
    exportToExcel({ tasks, temperatures, foodItems });
  };

  return (
    <Button
      onClick={handleExport}
      leftSection={<IconDownload size={16} />}
      variant="filled"
      color="blue"
    >
      Excel Export
    </Button>
  );
};