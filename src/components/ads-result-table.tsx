import MUIDataTable from 'mui-datatables';

const columns = [
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
  'Results',
];

interface AdsResultTableProps {
  results: string[][];
}

export default function AdsResultTable({ results }: AdsResultTableProps) {
  return (
    <div>
      <MUIDataTable
        title={'Employee List'}
        data={results}
        columns={columns}
        options={{ selectableRowsHideCheckboxes: true }}
      />
    </div>
  );
}
