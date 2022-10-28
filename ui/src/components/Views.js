import React from 'react';
import View from './View';
import { Group } from './Group';
import { Button } from './Button';
import { FlexBox } from './Box';

const Views = ({ extractedData, viewsSpec, onViewChange, onViewDelete, onViewAdd }) => {
  return (
    <Group title="Views">
      <FlexBox gap="2rem" flexDirection="column" alignItems="stretch">
        {viewsSpec &&
          viewsSpec.map((view, index) => (
            <View
              view={view}
              key={index}
              index={index}
              onViewChange={onViewChange}
              onViewDelete={onViewDelete}
              extractedData={extractedData}
            />
          ))}
      </FlexBox>

      <FlexBox gap="1rem" margin="1rem 0 3rem">
        <Button onClick={onViewAdd}>Add View</Button>
      </FlexBox>
    </Group>
  );
};

export default Views;
