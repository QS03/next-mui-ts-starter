import { useState, forwardRef, ReactElement, Ref } from 'react';

import {
  AppBar,
  Toolbar,
  Button,
  Dialog,
  List,
  Divider,
  Typography,
  Slide,
  Box,
  TextField,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar } from 'notistack';
import ReactJson from 'react-json-view';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FilterDialogProps {
  open: boolean;
  results: object;
  onFilter: (entityType: string, entityId: string) => void;
  onClose: () => void;
}

export default function AdsPrintDialog({
  open,
  results,
  onFilter,
  onClose,
}: FilterDialogProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [entityType, setEntityType] = useState('');
  const [entityId, setEntityId] = useState('');

  const handleFilter = () => {
    try {
      onFilter(entityType, entityId);
    } catch (err) {
      if (err instanceof Error) {
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    }
  };

  const handleCloseClick = () => {
    setEntityType('');
    setEntityId('');
    onClose();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseClick}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} color="secondary">
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Print Ads
            </Typography>
            <Button
              autoFocus
              color="error"
              onClick={handleCloseClick}
              variant="contained"
              sx={{ ml: 2 }}
            >
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{ mx: 2 }}>
          <Box
            sx={{
              my: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <TextField
              label="Entity Type"
              value={entityType}
              onChange={(e) => setEntityType(e.target.value)}
            />
            <TextField
              label="Entity Id"
              value={entityId}
              onChange={(e) => setEntityId(e.target.value)}
            />
            <Button color="primary" onClick={handleFilter} variant="contained">
              Print
            </Button>
          </Box>
        </List>
        <Divider />
        <List sx={{ mx: 2 }}>
          <ReactJson
            src={results}
            enableClipboard={false}
            displayDataTypes={false}
          />
        </List>
      </Dialog>
    </div>
  );
}
