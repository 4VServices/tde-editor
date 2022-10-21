import React from 'react';
import { Box } from './Box';
import { Button } from './Button';
import { FlexBox } from './Box';
import { Group } from './Group';
import ExtractedTriples from './ExtractedTriples';
import Triple from './Triple';

const Triples = ({ triplesSpec, extractedData, onTripleChange, onTripleDelete, onTripleAdd }) => {
  return (
    <Group title="Triples">
      <FlexBox gap="2rem" flexDirection="column" alignItems="stretch">
        {triplesSpec &&
          triplesSpec.map((triple, index) => (
            <Triple
              triple={triple}
              key={index}
              index={index}
              onTripleChange={onTripleChange}
              onTripleDelete={onTripleDelete}
              extractedData={extractedData}
            />
          ))}
      </FlexBox>
      <FlexBox gap="1rem" margin="1rem 0 3rem">
        <Button onClick={onTripleAdd}>Add Triple</Button>
      </FlexBox>
      <Box marginTop="2rem">
        <ExtractedTriples extractedData={extractedData} />
      </Box>
    </Group>
  );
};

export default Triples;
