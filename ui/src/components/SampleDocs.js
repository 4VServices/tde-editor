import React, { useState } from 'react';
import { Group } from './Group';
import { FlexBox } from './Box';
import { TextEdit } from './TextEdit';
import { Button } from './Button';

const SampleDocs = ({ uris, addURI, removeURI, contentDB, authHeaders }) => {
  const [currentURI, setCurrentURI] = useState('');
  const [currentViewedDoc, setCurrentViewedDoc] = useState('');
  const [currentViewedURI, setCurrentViewedURI] = useState('');

  const handleURIChange = (uri) => {
    setCurrentURI(uri);
  };

  const handleAddURI = () => {
    if (currentURI !== '') {
      addURI(currentURI);
      setCurrentURI('');
    }
  };

  const handleRemoveURI = (uri) => {
    removeURI(uri); // Remove the URI from the list
    if (currentViewedURI === uri) {
      setCurrentViewedDoc('');
    }
  };

  const viewDoc = (uri) => {
    console.log('SampleDocs; viewDoc');
    fetch(`${process.env.REACT_APP_API_URL || ''}/document?contentDB=${contentDB}&uri=${uri}`, {
      method: 'GET',
      headers: authHeaders
    })
      .then((res) => {
        const contentType = res.headers.get('content-type');

        if (contentType.includes('application/json')) {
          return res.json().then((jsonResult) => ({
            type: 'json',
            data: JSON.stringify(jsonResult, null, 2)
          }));
        } else if (contentType.includes('application/xml') || contentType.includes('text/xml')) {
          return res.text().then((xmlText) => ({
            type: 'xml',
            data: formatXml(xmlText)
          }));
        } else {
          throw new Error('Unsupported content type');
        }
      })
      .then(
        (result) => {
          console.log('/api/document call succeeded');
          setCurrentViewedDoc(result.data);
          setCurrentViewedURI(uri);
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

// Helper function to format XML for better readability
  const formatXml = (xml) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');
    const serializer = new XMLSerializer();
    return serializer.serializeToString(xmlDoc);
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
            <TextEdit disabled label="URI" value={uri} onChange={() => {}} rootStyle={{ flexGrow: 1 }} />
            <Button onClick={(e) => viewDoc(uri)}>View</Button>
            <Button danger onClick={(e) => handleRemoveURI(uri)}>
              Remove
            </Button>
          </FlexBox>
        ))}

        <TextEdit type={'textarea'} rows={5} value={currentViewedDoc} />
      </FlexBox>
    </Group>
  );
};

export default SampleDocs;
