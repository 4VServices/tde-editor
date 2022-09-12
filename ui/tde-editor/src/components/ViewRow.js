import React from 'react';
import { FlexBox } from './Box';
import { Group } from './Group';
import { TextEdit } from './TextEdit';

const ViewRow = ({ viewRow, index, handleRowChange }) => {
  console.log('zz', viewRow);
  return (
    <Group title={''}>
      <FlexBox flexDirection="column" alignItems="stretch" gap="1rem">
        <TextEdit label="Schema" value={viewRow.schemaName} onChange={(v) => handleRowChange(index, 'schemaName', v)} />
        <TextEdit label="View" placeholder={viewRow.viewName} onChange={(v) => handleRowChange(index, 'viewName', v)} />
      </FlexBox>
    </Group>
  );
};

export default ViewRow;
