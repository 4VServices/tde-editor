import React from 'react';
import ViewRow from './ViewRow';
import ExtractedRows from './ExtractedRows';
import { Group } from './Group';
import { Button } from './Button';
import { FlexBox } from './Box';

const ViewRows = ({ extractedData, rowsSpec, onRowChange }) => {
  return (
    <Group title="View Rows">
      {rowsSpec &&
        rowsSpec.map((row, index) => <ViewRow viewRow={row} key={index} index={index} handleRowChange={onRowChange} />)}
      <FlexBox gap="1rem" margin="1rem 0 3rem">
        <Button>Add View</Button>
        <Button>Add column</Button>
      </FlexBox>

      <ExtractedRows extractedData={extractedData} rowsSpec={rowsSpec} />
    </Group>
  );
};

export default ViewRows;
