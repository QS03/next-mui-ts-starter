import React, { useState, CSSProperties } from 'react';
import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

import {
  useCSVReader,
  formatFileSize,
} from 'react-papaparse';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const GREY_DIM = '#686868';

const styles = {
  zone: {
    alignItems: 'center',
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
    minHeight: '164px'
  } as CSSProperties,
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    borderRadius: 20,
    display: 'flex',
    height: 120,
    width: 120,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  } as CSSProperties,
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  } as CSSProperties,
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  } as CSSProperties,
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  zoneHover: {
    borderColor: GREY_DIM,
  } as CSSProperties,
  default: {
    borderColor: GREY,
  } as CSSProperties,
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  } as CSSProperties,
};

const CSVHeader = [
  'Campaign ID',
  'Campaign Title',
  'Campaign Objective',
  'Ad Group ID',
  'Ad Group Campaign ID',
  'Ad Group Title',
  'Geo Locations',
  'Start Date',
  'End Date',
  'Ad ID',
  'Ad Title',
  'Ad Ad Group ID',
  'Post ID',
];

interface CSVUploaderProps {
  onUpload: (data: any) => void;
}

export const CSVUploader = ({ onUpload }: CSVUploaderProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removed, setRemoved] = useState(true);

  const handleCSVUpload = (results: any) => {
    if(results.data[0].toString() !== CSVHeader.toString()) {
      enqueueSnackbar('Invalid CSV schema', {variant: 'error'});
      return;
    }

    onUpload(results.data);
    setRemoved(false);
    setZoneHover(false);
  };

  const handleFileRemove = () => {
    onUpload([]);
    setRemoved(true);
  };

  return (
    <>
      <Box>
        <CSVReader
          onUploadAccepted={handleCSVUpload}
          onDragOver={(event: DragEvent) => {
            event.preventDefault();
            setZoneHover(true);
          }}
          onDragLeave={(event: DragEvent) => {
            event.preventDefault();
            setZoneHover(false);
          }}
        >
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
          }: any) => (
            <>
              <div
                {...getRootProps()}
                style={Object.assign(
                  {},
                  styles.zone,
                  zoneHover && styles.zoneHover
                )}
              >
                {!removed && acceptedFile ? (
                  <>
                    <div style={styles.file}>
                      <div style={styles.info}>
                        <span style={styles.size}>
                          {formatFileSize(acceptedFile.size)}
                        </span>
                        <span style={styles.name}>{acceptedFile.name}</span>
                      </div>
                      <div style={styles.progressBar}>
                        <ProgressBar />
                      </div>
                    </div>
                  </>
                ) : (
                  'Drop CSV file here or click to upload'
                )}
              </div>
            </>
          )}
        </CSVReader>
      </Box>
      <Box
        sx={{ my: 3, width: '100%', display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          onClick={handleFileRemove}
          disabled={removed}
          variant="outlined"
          color="error"
        >
          Remove
        </Button>
      </Box>
    </>
  );
};
