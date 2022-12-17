import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Tab, Box, Button } from '@mui/material';
import { RootState } from '../redux/store';

import AdsImportDialog from '../components/ads-import-dialog';
import AdsResultTable from '../components/ads-result-table';

import { upload, clear } from '../redux/slices/ads';

export default function Home() {
  const dispatch = useDispatch();
  const [openImport, setOpenImport] = useState(false);
  const { results } = useSelector((state: RootState) => state.ads);

  useEffect(() => {
    console.log(results);
  }, [results]);

  const handleImportClick = () => {
    setOpenImport(true);
  };
  const handleImportSubmit = (columns: string[], data: string[][]) => {
    console.log(columns);
    dispatch(upload(data));
    setOpenImport(false);
  };

  const handleImportCancel = () => {
    setOpenImport(false);
  };

  const handleClear = () => {
    dispatch(clear())
  };
  return (
    <>
      <Head>
        <title>Next App</title>
      </Head>
      <Box sx={{ width: '100%', p: 2 }}>
        <AdsImportDialog
          open={openImport}
          onSubmit={handleImportSubmit}
          onCancel={handleImportCancel}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained" onClick={handleImportClick}>
            Import
          </Button>
          <Button variant="contained" onClick={handleImportClick}>
            Export
          </Button>
          <Button variant="contained" onClick={handleClear}>
            Clear
          </Button>
        </Box>
        <Box sx={{mt: 2}}>
          <AdsResultTable results={results} />
        </Box>
      </Box>
    </>
  );
}
