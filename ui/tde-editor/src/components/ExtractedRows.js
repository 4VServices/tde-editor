import React, { useMemo } from 'react';
import './ExtractedRows.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';

const ExtractedRows = ({ rowsSpec, extractedData }) => {
  const extractedRows = useMemo(() => {
    if (!extractedData) return [];
    return rowsSpec.map((rowSpec) => {
      const row = {
        schema: rowSpec.schemaName,
        view: rowSpec.viewName,
        columns: rowSpec.columns
      };

      const datas = [];
      Object.keys(extractedData).forEach((key) => {
        const data = extractedData[key];
        data?.forEach((dd) => {
          if (dd.row && dd.row.schema === row.schema && dd.row.view === row.view) {
            datas.push({
              ...dd.row.data,
              key: key
            });
          }
        });
      });
      return {
        ...row,
        datas
      };
    });
  }, [extractedData, rowsSpec]);

  return (
    <Container className="extractedRows">
      <h3>ExtractedRows</h3>
      {!extractedData && <div>No rows found</div>}
      <Stack gap={3}>
        {extractedRows?.map((extractedRow, i) => {
          return (
            <div key={i} className="extracted-row-container">
              <Stack direction="horizontal" gap={5} style={{ marginBottom: '8px' }}>
                <Stack direction="horizontal" gap={1}>
                  <div>Schema:</div>
                  <div className="bold-text">{extractedRow.schema}</div>
                </Stack>
                <Stack direction="horizontal" gap={1}>
                  <div>View:</div>
                  <div className="bold-text">{extractedRow.view}</div>
                </Stack>
              </Stack>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Extracted From</th>
                    {extractedRow.columns?.map((column) => (
                      <th key={column.val}>{column.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {extractedRow.datas?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.key}</td>
                        {extractedRow.columns?.map((column) => (
                          <td key={column.val}>{data[column.name]}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          );
        })}
      </Stack>
    </Container>
  );
};

export default ExtractedRows;
