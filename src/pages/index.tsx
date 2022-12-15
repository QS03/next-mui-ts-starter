import Head from 'next/head';
import { Container, Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Container maxWidth="lg">
        <Box
          height="100vh"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" color="primary">
            Material UI v5 with Next.js in TypeScript
          </Typography>
        </Box>
      </Container>
    </>
  );
}
