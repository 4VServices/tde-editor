import React, { useCallback } from 'react';
import { Button } from './Button';
import { Group } from './Group';
import { FlexBox } from './Box';
import { TextEdit } from './TextEdit';

const Variable = ({ varSpec, index, onVarDelete, onVarMove, isLast }) => {
  const handleVarMove = useCallback(
    (index, direction) => {
      onVarMove(index, direction);
    },
    [onVarMove]
  );

  return (
    <Group>
      <FlexBox flexDirection="row" gap="2rem">
        <FlexBox flexDirection="column" flexGrow="1" gap="1rem" alignItems="stretch">
          <TextEdit label="name" value={varSpec.name} />
          <TextEdit label="value" value={varSpec.val} />
        </FlexBox>
        <FlexBox flexDirection="column" gap="1rem" alignItems="stretch">
          <Button danger onClick={() => onVarDelete(index)}>
            Delete
          </Button>
          <Button disabled={index === 0} onClick={() => handleVarMove(index, -1)}>
            Move Up
          </Button>
          <Button disabled={isLast} onClick={() => handleVarMove(index, 1)}>
            Move Down
          </Button>
        </FlexBox>
      </FlexBox>
    </Group>
  );
};

export default Variable;
