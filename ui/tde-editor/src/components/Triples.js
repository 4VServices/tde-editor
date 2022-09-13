import React from 'react';
import { Box } from './Box';
import { Button } from './Button';
import ExtractedTriples from './ExtractedTriples';
import { Group } from './Group';

const Triples = ({ rowsSpec, extractedData }) => {
  return (
    <Group title="Triples">
      <Button type="primary">Add Triple</Button>
      <Box marginTop="2rem">
        <ExtractedTriples extractedData={extractedData} />
      </Box>
    </Group>
  );
};

export default Triples;
