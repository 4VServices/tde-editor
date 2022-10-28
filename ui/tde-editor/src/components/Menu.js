import React from 'react';
import { B2Med } from './common';
import { Select } from './Select';
import { Box, FlexBox } from './Box';
import { Button } from './Button';

const Menu = ({
  selectedTemplateURI,
  selectedContentDb,
  contentDBs,
  templates,
  onTemplateInsert,
  onTemplateExtract,
  onContentDbSelected,
  onTemplateSelected,
  handleValidate,
  handleExport
}) => {
  const handleMenuSelect = (dbName, event) => {
    onContentDbSelected(dbName);
  };

  const handleTemplateSelect = (template, event) => {
    onTemplateSelected(template);
    console.log(`handleTemplateSelect: ${JSON.stringify(template)}`);
  };

  return (
    <div>
      <B2Med>Content Database</B2Med>
      <Select
        value={selectedContentDb}
        options={contentDBs.map((db) => ({ value: db }))}
        onChange={(v) => handleMenuSelect(v)}
        fullwidth
      />

      <Box marginTop="2rem">
        <B2Med>Template</B2Med>
        <Select
          value={selectedTemplateURI}
          options={templates.map((template) => ({ value: template.uri }))}
          onChange={(v) => handleTemplateSelect(v)}
          fullwidth
        />
      </Box>

      <FlexBox marginTop="4rem" flexDirection="column" gap="2rem">
        <Button onClick={onTemplateInsert} block type="primary">
          Insert
        </Button>
        <Button onClick={() => handleExport()} block type="primary">
          Export
        </Button>
        <Button onClick={handleValidate} block type="primary">
          Validate
        </Button>
        <Button onClick={onTemplateExtract} block type="primary">
          Extract
        </Button>
      </FlexBox>
    </div>
  );
};

export default Menu;
