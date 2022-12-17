import { createSlice } from '@reduxjs/toolkit';
import { adsManager } from '../../utils/ads-manager';

interface AdsState {
  results: string[][];
  printResults: any;
}

const initialState: AdsState = {
  results: [],
  printResults: {},
};

export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    upload: (state, { payload }) => {
      console.log(payload);
      state.results = adsManager.importAds(payload);
    },
    clear: (state) => {
      adsManager.clearAds();
      state.results = [];
    },
    filterPrintResults: (state, { payload }) => {
      state.printResults = adsManager.printAds(
        payload.entityType,
        payload.entityId
      );
    },
    clearPrintResults: (state) => {
      state.printResults = {};
    },
  },
});

export const { upload, clear } = adsSlice.actions;

export default adsSlice.reducer;
