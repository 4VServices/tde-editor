import React, { useState } from 'react';
import { Group } from './Group';
import { FlexBox } from './Box';
import { TextEdit } from './TextEdit';
import { Button } from './Button';

const SampleDocs = ({ uris, addURI, contentDB, authHeaders }) => {
  const [currentURI, setCurrentURI] = useState('');
  const [currentViewedDoc, setCurrentViewedDoc] = useState('');

  const handleURIChange = (uri) => {
    setCurrentURI(uri);
  };

  const handleAddURI = () => {
    addURI(currentURI);
    setCurrentURI('');
  };

  const viewDoc = (uri) => {
    console.log('SampleDocs; viewDoc');
    fetch(`${process.env.REACT_APP_API_URL || ''}/document?contentDB=${contentDB}&uri=${uri}`, {
      method: 'GET',
      headers: authHeaders
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('/api/document call succeeded');
          // TODO: handle XML content
          setCurrentViewedDoc(JSON.stringify(result));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(`templates call failed: ${error}`);
          setCurrentViewedDoc(`Unable to load ${uri}`);
        }
      );
  };

  return (
    <Group title="Sample Documents">
      <FlexBox flexDirection="column" gap="1rem" alignItems="stretch">
        <FlexBox alignItems="flex-end" gap="1rem">
          <TextEdit label="URI" value={currentURI} onChange={handleURIChange} rootStyle={{ flexGrow: 1 }} />
          <Button onClick={(e) => handleAddURI()}>Add</Button>
        </FlexBox>
        {uris.map((uri) => (
          <FlexBox key={uri} gap="1rem" alignItems="flex-end">
            <TextEdit label="URI" value={uri} onChange={() => {}} rootStyle={{ flexGrow: 1 }} />
            <Button onClick={(e) => viewDoc(uri)}>View</Button>
            <Button danger>Remove</Button>
          </FlexBox>
        ))}

        <TextEdit type={'textarea'} rows={5} value={currentViewedDoc} />
      </FlexBox>
    </Group>
  );
};

export default SampleDocs;
