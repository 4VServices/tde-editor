import React, { useState } from 'react';
import { Group } from './Group';
import { TextEdit } from './TextEdit';
import { FlexBox } from './Box';

const Template = ({
  templateURI,
  handleURIChange,
  handleDescriptionChange,
  description,
  handleCollectionChange,
  collections,
  handleContextChange,
  context
}) => {
  console.log(`Template; collections=${JSON.stringify(collections)}`);
  const [joinedCollections, setJoinedCollections] = useState(collections.join('\n'));

  const handleCollectionInputChange = (event) => {
    console.log(`handleCollectionInputChange: event=${JSON.stringify(event)}`);
    setJoinedCollections(event);
    handleCollectionChange(event.split('\n'));
  };

  return (
    <Group title="Template">
      <FlexBox flexDirection="column" gap="1rem" alignItems="stretch">
        <TextEdit label="URI" value={templateURI} onChangeDebounced={handleURIChange} />
        <TextEdit label="Description" type="textarea" rows={3} value={description} onChange={handleDescriptionChange} />
        <TextEdit
          label="Collections"
          type="textarea"
          rows={3}
          value={joinedCollections}
          onChange={handleCollectionInputChange}
        />
        <TextEdit label="Directory" placeholder={''} onChange={() => {}} />
        <TextEdit label="Context" value={context} onChange={handleContextChange} />
      </FlexBox>
    </Group>
  );
};

export default Template;
