import React from 'react';
import Variable from './Variable';
import { Group } from './Group';
import { Button } from './Button';
import { FlexBox } from './Box';

const Variables = ({ variables, onVarDelete, onVarAdd, onVarMove }) => {
  return (
    <Group title="Variables">
      <FlexBox gap="2rem" flexDirection="column" alignItems="stretch">
        {variables &&
          variables.map((variable, index) => (
            <Variable
              varSpec={variable}
              key={index}
              index={index}
              onVarDelete={onVarDelete}
              onVarMove={onVarMove}
              isLast={index === variables.length - 1}
            />
          ))}
      </FlexBox>
      <FlexBox gap="1rem" margin="1rem 0 3rem">
        <Button onClick={onVarAdd}>Add Variable</Button>
      </FlexBox>
    </Group>
  );
};

export default Variables;
