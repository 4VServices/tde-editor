import React, { useMemo } from 'react';
import Container from 'react-bootstrap/esm/Container';
import './ExtractedTriples.css';
import Stack from 'react-bootstrap/Stack';

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
    <Container className="extractedTriples">
      <h3>Extracted Triples</h3>
      {!extractedTriples.length && <div>No rows found</div>}
      {extractedTriples?.length > 0 && (
        <Stack gap={3}>
          {extractedTriples.map((triple, index) => {
            return (
              <div className="triple-container" key={`${triple.object}-${index}`}>
                <Stack direction="horizontal" gap={3}>
                  <div className="label">Subject:</div>
                  <div>{triple.subject}</div>
                </Stack>
                <Stack direction="horizontal" gap={3}>
                  <div className="label">Predicate:</div>
                  <div>{triple.predicate}</div>
                </Stack>
                <Stack direction="horizontal" gap={3}>
                  <div className="label">Object:</div>
                  <div>{triple.object}</div>
                </Stack>
              </div>
            );
          })}
        </Stack>
      )}
    </Container>
  );
};

export default ExtractedTriples;
