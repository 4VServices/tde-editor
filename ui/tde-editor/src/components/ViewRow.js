import { Checkbox } from 'antd';
import React, { useCallback } from 'react';
import { FlexBox } from './Box';
import { Button } from './Button';
import { B3Reg } from './common';
import { Group } from './Group';
import { Select } from './Select';
import { TextEdit } from './TextEdit';
import styled from 'styled-components';

const ColumnsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem 0;
`;

const ViewRow = ({ viewRow, index: rowIndex, onRowChange, onRowDelete }) => {
  const handleColumnChange = useCallback(
    (index, key, value) => {
      const columns = viewRow.columns.map((column, i) => {
        if (i === index) {
          return {
            ...column,
            collation: key === 'scalarType' && value !== 'string' ? '' : column.collation,
            [key]: value
          };
        }
        return column;
      });

      onRowChange(rowIndex, {
        ...viewRow,
        columns
      });
    },
    [viewRow, onRowChange, rowIndex]
  );

  const handleRowChange = useCallback(
    (index, key, value) => {
      onRowChange(index, {
        ...viewRow,
        [key]: value
      });
    },
    [viewRow, onRowChange]
  );

  const handleDeleteColumn = useCallback(
    (columnIndex) => {
      const confirm = window.confirm('Are you sure you want to delete?');
      if (confirm) {
        onRowChange(rowIndex, {
          ...viewRow,
          columns: viewRow.columns.filter((c, i) => i !== columnIndex)
        });
      }
    },
    [rowIndex, onRowChange, viewRow]
  );

  const handleAddColumn = useCallback(() => {
    onRowChange(rowIndex, {
      ...viewRow,
      columns: [...(viewRow.columns || []), DefaultColumn]
    });
  }, [onRowChange, rowIndex, viewRow]);

  return (
    <Group title={`Row ${rowIndex + 1}`}>
      <FlexBox alignItems="stretch" gap="2rem" justifyContent="space-between">
        <FlexBox gap="2rem">
          <TextEdit
            label="Schema"
            value={viewRow.schemaName}
            onChange={(v) => handleRowChange(rowIndex, 'schemaName', v)}
          />
          <TextEdit label="View" value={viewRow.viewName} onChange={(v) => handleRowChange(rowIndex, 'viewName', v)} />
        </FlexBox>
        <FlexBox gap="2rem">
          <Button onClick={handleAddColumn}>Add column</Button>
          <Button danger onClick={() => onRowDelete(rowIndex)}>
            Delete row
          </Button>
        </FlexBox>
      </FlexBox>
      <ColumnsContainer>
        {viewRow.columns?.map((column, columnIndex) => {
          return (
            <Group title={`Column ${columnIndex + 1}`} key={columnIndex}>
              <FlexBox flexDirection="column" alignItems="stretch" gap="1rem">
                <FlexBox gap="1rem" justifyContent="space-between" alignItems="flex-end">
                  <TextEdit
                    label="name"
                    value={column.name}
                    onChangeDebounced={(v) => handleColumnChange(columnIndex, 'name', v)}
                  />
                  <Button danger onClick={() => handleDeleteColumn(columnIndex)}>
                    Delete
                  </Button>
                </FlexBox>
                <FlexBox gap="1rem" flexWrap="nowrap">
                  <Select
                    label="type"
                    value={column.scalarType}
                    options={ScalarTypes}
                    onChange={(v) => handleColumnChange(columnIndex, 'scalarType', v)}
                  />
                  <Select
                    label="Reindexing"
                    value={column.reindexing}
                    options={Reindexings}
                    onChange={(v) => handleColumnChange(columnIndex, 'reindexing', v)}
                  />
                </FlexBox>
                <FlexBox justifyContent="space-between">
                  <Checkbox
                    checked={column.nullable}
                    onChange={(e) => handleColumnChange(columnIndex, 'nullable', e.target.checked)}
                  >
                    nullable
                  </Checkbox>
                  <Checkbox
                    checked={column.rejectInvalid}
                    onChange={(e) => handleColumnChange(columnIndex, 'rejectInvalid', e.target.checked)}
                  >
                    Reject Invalid
                  </Checkbox>
                </FlexBox>
                <TextEdit
                  label="value"
                  width="30rem"
                  value={column.val}
                  onChangeDebounced={(v) => handleColumnChange(columnIndex, 'val', v)}
                />
                <TextEdit
                  label="Default"
                  value={column.default}
                  onChangeDebounced={(v) => handleColumnChange(columnIndex, 'default', v)}
                />
                <TextEdit
                  label="Collation"
                  value={column.collation}
                  rootStyle={{ flexGrow: 1 }}
                  onChangeDebounced={(v) => handleColumnChange(columnIndex, 'collation', v)}
                  disabled={column.scalarType !== 'string'}
                />
              </FlexBox>
            </Group>
          );
        })}
      </ColumnsContainer>
    </Group>
  );
};

const ScalarTypes = [
  { value: 'number' },
  { value: 'string' },
  { value: 'decimal' },
  { value: 'integer' },
  { value: 'long' },
  { value: 'int' },
  { value: 'short' },
  { value: 'byte' },
  { value: 'float' },
  { value: 'double' },
  { value: 'boolean' },
  { value: 'date' },
  { value: 'time' },
  { value: 'dateTime' },
  { value: 'duration' },
  { value: 'dayTimeDuration' },
  { value: 'yearMonthDuration' },
  { value: 'anyURI' },
  { value: 'IRI' }
];

const Reindexings = [{ value: 'hidden' }, { value: 'visible' }];

const DefaultColumn = {
  rejectInvalid: true,
  reindexing: 'hidden'
};

export default ViewRow;
