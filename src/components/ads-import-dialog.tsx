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
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import MUIDataTable from 'mui-datatables';

import { CSVUploader } from './csv-uploader';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ImportDialogProps {
  open: boolean;
  onSubmit: (columns: string[], data: string[][]) => void;
  onCancel: () => void;
}

export default function AdsImportDialog({
  open,
  onSubmit,
  onCancel,
}: ImportDialogProps) {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const handleCSVUpload = (results: any) => {
    setColumns(results[0]);
    setData(results.slice(1));
  };

  const handleSubmit = () => {
    onSubmit(columns, data);
    setColumns([]);
    setData([]);
  };

  const handleCancel = () => {
    setColumns([]);
    setData([]);
    onCancel();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleCancel}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} color="secondary">
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Import Ads
            </Typography>
            <Button
              autoFocus
              color="primary"
              onClick={handleSubmit}
              variant="contained"
              sx={{ ml: 2 }}
              disabled={data.length === 0}
            >
              Import
            </Button>
            <Button
              autoFocus
              color="error"
              onClick={handleCancel}
              variant="contained"
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{ mx: 2 }}>
          <CSVUploader onUpload={handleCSVUpload} />
          <Divider />
          <MUIDataTable
            title={'Employee List'}
            data={data}
            columns={columns}
            options={{ selectableRowsHideCheckboxes: true }}
          />
        </List>
      </Dialog>
    </div>
  );
}
