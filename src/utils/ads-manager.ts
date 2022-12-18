class AdsManager {
  results: string[][];

  constructor() {
    this.results = [];
  }

  clearAds() {
    this.results = [];
  }

  getNewId(entityType: string) {
    let colId: number;
    if (entityType === 'campaign') {
      colId = 0;
    } else if (entityType === 'ad group') {
      colId = 3;
    } else if (entityType === 'ad') {
      colId = 9;
    } else {
      throw new Error('Invalid entity type');
    }

    const ids = this.results.map((result) => parseInt(result[colId]));

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    return newId.toString();
  }

  importAds(uploadedAds: string[][]) {
    uploadedAds.forEach((row: string[]) => {
      let result = [...row, 'Success'];
      // Campaign ID validation
      let campaign_id = row[0];
      if (Number.isNaN(parseInt(campaign_id))) {
        if (row[0].length === 0) {
          campaign_id = this.getNewId('campaign');
        } else {
          result[13] = 'Invalid campaign id';
        }
      }
      result[0] = campaign_id;
      result[4] = campaign_id;

      // Ad Group ID validation
      let ad_group_id = row[3];
      if (Number.isNaN(parseInt(ad_group_id))) {
        if (row[3].length === 0) {
          ad_group_id = this.getNewId('ad group');
        } else {
          result[13] = 'Invalid ad group id';
        }
      }
      result[3] = ad_group_id;
      result[11] = ad_group_id;

      // Ad Group start date
      let start_date = row[7];
      if (isNaN(Date.parse(start_date))) {
        result[13] = 'Invalid start date';
      }

      // Ad Group end date
      let end_date = row[7];
      if (isNaN(Date.parse(end_date))) {
        result[13] = 'Invalid end date';
      }

      // Ad ID validation
      let ad_id = row[9];
      if (Number.isNaN(parseInt(ad_id))) {
        if (row[9].length === 0) {
          ad_id = this.getNewId('ad');
        } else {
          result[13] = 'Invalid ad id';
        }
      }
      result[9] = ad_id;

      let existingIndex = this.results.findIndex(
        (row) =>
          row[0] === campaign_id && row[3] === ad_group_id && row[9] === ad_id
      );

      if (existingIndex < 0) {
        this.results = [...this.results, result];
      } else {
        this.results[existingIndex] = result;
      }
    });

    return this.results;
  }

  printAds(entityType: string | null, entityId: string | null) {
    let filteredResults;
    
    if (!entityType && !entityId) {
      const campaigns = this.results.map((result) => ({
        id: result[0],
        title: result[1],
        objective: result[2],
      }));

      const ad_groups = this.results.map((result) => ({
        id: result[3],
        campaign_id: result[4],
        title: result[5],
        geolocations: result[6],
        start_date: result[7],
        end_date: result[8],
      }));

      const ads = this.results.map((result) => ({
        id: result[9],
        ad_group_id: result[10],
        title: result[11],
        post_id: result[12],
      }));

      filteredResults = { campaigns, ad_groups, ads };
    } else if (entityType && entityId) {
      switch (entityType) {
        case 'campaign':
          const campaigns = this.results
            .filter((result) => result[0] === entityId)
            .map((result) => ({
              id: result[0],
              title: result[1],
              objective: result[2],
            }));
          filteredResults = { campaigns };
          break;
        case 'ad_group':
          const ad_groups = this.results
            .filter((result) => result[3] === entityId)
            .map((result) => ({
              id: result[3],
              campaign_id: result[4],
              title: result[5],
              geolocations: result[6],
              start_date: result[7],
              end_date: result[8],
            }));
          filteredResults = { ad_groups };
          break;
        case 'ad':
          const ads = this.results
            .filter((result) => result[9] === entityId)
            .map((result) => ({
              id: result[9],
              ad_group_id: result[10],
              title: result[11],
              post_id: result[12],
            }));
          filteredResults = { ads };
          break;
        default:
          break;
      }
    } else {
      throw new Error(
        'Both entity type and entity id must be specified or null'
      );
    }

    return filteredResults;
  }
}

export const adsManager = new AdsManager();
