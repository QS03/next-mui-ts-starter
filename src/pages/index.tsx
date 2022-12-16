import Head from 'next/head';
import React, { useState } from 'react';
import { Container, Tab, Box, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import AdsImportDialog from '../components/ads-import-dialog';

export default function Home() {
  const [openImport, setOpenImport] = useState(false);

  const handleImportClick = () => {
    setOpenImport(true);
  };
  const handleImportSubmit = (columns: string[], data: string[][]) => {
    console.log(columns);
    console.log(data);
    setOpenImport(false);
  };

  const handleImportCancel = () => {
    setOpenImport(false);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Container sx={{ width: '100%', m: 2 }}>
        <AdsImportDialog
          open={openImport}
          onSubmit={handleImportSubmit}
          onCancel={handleImportCancel}
        />
        <Box sx={{ width: '100%', display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleImportClick}>
            Import
          </Button>
          <Button variant="contained" onClick={handleImportClick}>
            Export
          </Button>
        </Box>
      </Container>
    </>
  );
}
