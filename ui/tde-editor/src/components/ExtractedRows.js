import React, { useMemo } from 'react';
import './ExtractedRows.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const ExtractedRows = ({ extractedData }) => {
  const extractedRows = useMemo(() => {
    if (!extractedData) return [];
    let result = [];
    Object.keys(extractedData).forEach((key) => {
      const data = extractedData[key];
      data?.forEach((dd) => {
        if (dd.row?.data) {
          result.push({
            ...dd.row.data,
            key: key
          });
        }
      });
    });

    return result;
  }, [extractedData]);

  return (
    <Container className="ExtractedRows">
      <h3>ExtractedRows</h3>
      {!extractedData && <div>No rows found</div>}
      {extractedRows?.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>document</th>
              <th>date</th>
              <th>league</th>
            </tr>
          </thead>
          <tbody>
            {extractedRows.map((rowData) => {
              return (
                <tr key={rowData.id}>
                  <td>{rowData.id}</td>
                  <td>{rowData.key}</td>
                  <td>{rowData.date}</td>
                  <td>{rowData.league}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ExtractedRows;
