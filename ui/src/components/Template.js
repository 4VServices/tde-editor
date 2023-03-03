import React from 'react';
import { Group } from './Group';
import { TextEdit } from './TextEdit';
import { FlexBox } from './Box';

const Template = ({
  templateURI,
  handleURIChange,
  handleDescriptionChange,
  description,
  handleCollectionChange,
  collection,
  handleContextChange,
  context
}) => {
  return (
    <Group title="Template">
      <FlexBox flexDirection="column" gap="1rem" alignItems="stretch">
        <TextEdit label="URI" value={templateURI} onChangeDebounced={handleURIChange} />
        <TextEdit label="Description" type="textarea" rows={3} value={description} onChange={handleDescriptionChange} />
        <TextEdit label="Collection" value={collection} onChange={handleCollectionChange} />
        <TextEdit label="Directory" placeholder={''} onChange={() => {}} />
        <TextEdit label="Context" value={context} onChange={handleContextChange} />
      </FlexBox>
    </Group>
  );
};

export default Template;
