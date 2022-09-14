import React from 'react';
import ViewRow from './ViewRow';
import ExtractedRows from './ExtractedRows';
import { Group } from './Group';
import { Button } from './Button';
import { FlexBox } from './Box';

const ViewRows = ({ extractedData, rowsSpec, onRowChange, onRowDelete, onAddRow }) => {
  return (
    <Group title="View Rows">
      <FlexBox gap="2rem" flexDirection="column" alignItems="stretch">
        {rowsSpec &&
          rowsSpec.map((row, index) => (
            <ViewRow viewRow={row} key={index} index={index} onRowChange={onRowChange} onRowDelete={onRowDelete} />
          ))}
      </FlexBox>

      <FlexBox gap="1rem" margin="1rem 0 3rem">
        <Button onClick={onAddRow}>Add View</Button>
      </FlexBox>

      <ExtractedRows extractedData={extractedData} rowsSpec={rowsSpec} />
    </Group>
  );
};

export default ViewRows;
