import React from 'react';
import View from './View';
import { Group } from './Group';
import { Button } from './Button';
import { FlexBox } from './Box';

const Views = ({ extractedData, rowsSpec, onRowChange, onRowDelete, onAddRow }) => {
  return (
    <Group title="Views">
      <FlexBox gap="2rem" flexDirection="column" alignItems="stretch">
        {rowsSpec &&
          rowsSpec.map((row, index) => (
            <View
              view={row}
              key={index}
              index={index}
              onRowChange={onRowChange}
              onRowDelete={onRowDelete}
              extractedData={extractedData}
            />
          ))}
      </FlexBox>

      <FlexBox gap="1rem" margin="1rem 0 3rem">
        <Button onClick={onAddRow}>Add View</Button>
      </FlexBox>
    </Group>
  );
};

export default Views;
