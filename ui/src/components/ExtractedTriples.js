import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FlexBox } from './Box';
import { B3Reg } from './common';
import { Group } from './Group';

const Label = styled(B3Reg)`
  width: 18%;
`;

const ExtractedTriples = ({ extractedData }) => {
  const extractedTriples = useMemo(() => {
    if (!extractedData) return [];
    let result = [];
    Object.keys(extractedData).forEach((key) => {
      const data = extractedData[key];
      data?.forEach((dd) => {
        if (dd.triple) {
          result.push({
            ...dd.triple,
            key: key
          });
        }
      });
    });

    return result;
  }, [extractedData]);

  return (
    <Group title="Extracted Triples">
      {!extractedTriples.length && <div>No rows found</div>}
      {extractedTriples?.length > 0 && (
        <FlexBox flexDirection="column" gap="1rem" alignItems="stretch">
          {extractedTriples.map((triple, index) => {
            return (
              <Group key={`${triple.object}-${index}`}>
                <FlexBox gap="0.8rem" flexDirection="column" alignItems="stretch">
                  <FlexBox gap="1rem">
                    <Label>Subject:</Label>
                    <B3Reg>{triple.subject}</B3Reg>
                  </FlexBox>
                  <FlexBox gap="1rem">
                    <Label>Predicate:</Label>
                    <B3Reg>{triple.predicate}</B3Reg>
                  </FlexBox>
                  <FlexBox gap="1rem" flexWrap="nowrap">
                    <Label>Object:</Label>
                    <B3Reg>{triple.object}</B3Reg>
                  </FlexBox>
                </FlexBox>
              </Group>
            );
          })}
        </FlexBox>
      )}
    </Group>
  );
};

export default ExtractedTriples;
