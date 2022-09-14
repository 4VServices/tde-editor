import { Table } from 'antd';
import React, { useMemo } from 'react';
import { FlexBox } from './Box';
import { B2Med, B3Reg } from './common';
import { Group } from './Group';

const ExtractedRows = ({ viewSpec, extractedData }) => {
  const extractedView = useMemo(() => {
    if (!extractedData) return [];
    const row = {
      schema: viewSpec.schemaName,
      view: viewSpec.viewName,
      columns: viewSpec.columns
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
  }, [extractedData, viewSpec]);

  return (
    <Group title="Extracted Rows">
      {!extractedData && <div>No rows found</div>}
      <FlexBox gap={'1rem'} flexDirection="column" alignItems="stretch">
        <FlexBox gap={'2rem'} margin="0 0 1rem 0">
          <FlexBox gap={'.8rem'}>
            <B3Reg>Schema:</B3Reg>
            <B2Med>{extractedView.schema}</B2Med>
          </FlexBox>
          <FlexBox gap={'.8rem'}>
            <B3Reg>View:</B3Reg>
            <B2Med>{extractedView.view}</B2Med>
          </FlexBox>
        </FlexBox>
        {extractedView.datas?.length > 0 && (
          <Table
            dataSource={extractedView.datas}
            rowKey={(record) => record.key}
            columns={getColumns(extractedView.columns)}
            pagination={false}
            size="small"
            bordered
          />
        )}
      </FlexBox>
    </Group>
  );
};

const getColumns = (columns = []) => {
  return columns.map((column) => {
    return {
      key: column.val,
      title: column.name,
      dataIndex: column.name,
      render: (value) => <B3Reg>{value}</B3Reg>
    };
  });
};

export default ExtractedRows;
