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

  function displayValue(label, value) {
    return (
      <FlexBox gap="1rem">
        <Label>{label}:</Label>
        {value.datatype ? (
          <FlexBox gap="1rem">
            <Label>Data type:</Label>
            <B3Reg>{value.datatype}</B3Reg>
            <Label>Value:</Label>
            <B3Reg>{value.value}</B3Reg>
          </FlexBox>
        ) : (
          <B3Reg>{value}</B3Reg>
        )}
      </FlexBox>
    );
  }

  return (
    <Group title="Extracted Triples">
      {!extractedTriples.length && <div>No rows found</div>}
      {extractedTriples?.length > 0 && (
        <FlexBox flexDirection="column" gap="1rem" alignItems="stretch">
          {extractedTriples.map((triple, index) => {
            return (
              <Group key={`${triple.object}-${index}`}>
                <FlexBox gap="0.8rem" flexDirection="column" alignItems="stretch">
                  {displayValue('Subject', triple.subject)}
                  {displayValue('Predicate', triple.predicate)}
                  {displayValue('Object', triple.object)}
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
