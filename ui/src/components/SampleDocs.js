import React, { useEffect, useState } from 'react';
import { Group } from './Group';
import { FlexBox } from './Box';
import { TextEdit } from './TextEdit';
import { Button } from './Button';
import { Select } from './Select';

const SampleDocs = ({ uris, addURI, removeURI, contentDB, authHeaders, template }) => {
  const [currentURI, setCurrentURI] = useState('');
  const [currentViewedDoc, setCurrentViewedDoc] = useState('');
  const [currentViewedURI, setCurrentViewedURI] = useState('');
  const [availableURIs, setAvailableURIs] = useState([]);
  const [selectUri, setSelectUri] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    //have added this condition based on the initial empty template object in the application
    //assuming that a template will have at least collection or context or directory
    if (template && (template.template.context !== '' ||
      (template.template.collections && template.template.collections.length > 0) ||
      (template.template.directories && template.template.directories.length > 0))) {
      fetchURIs(1);
    }
  }, [template]);

  const fetchURIs = (pageNum) => {
    fetch(`${process.env.REACT_APP_API_URL || ''}/tde/uris?contentDB=${contentDB}&page=${pageNum}&pageSize=${pageSize}&totalCount=${totalCount}`, {
      method: 'POST',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(template)
    })
      .then((res) => res.json())
      .then((result) => {
        const newURIs = result.uris || [];
        setAvailableURIs(newURIs);
        setTotalCount(result.totalCount || 0);
        setPage(pageNum);
      })
      .catch((error) => console.error('Error fetching URIs:', error));
  };

  const totalPages = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 1;

  const handleNextPage = () => {
    if (page < totalPages) {
      fetchURIs(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchURIs(page - 1);
    }
  };

  const handleURIChange = (uri) => {
    setCurrentURI(uri);
  };

  const handleAddURI = () => {
    if (currentURI !== '') {
      addURI(currentURI);
      setCurrentURI('');
      setSelectUri('');
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
          <Select
            label={totalCount > 0 ? `Select URI (Page ${page} of ${totalPages})` : 'Select URI (No pages)'}
            options={availableURIs
              .sort()
              .map(uri => ({ label: uri, value: uri }))}
            value={selectUri}
            onChange={(selectedUri) => {
              setCurrentURI(selectedUri);
              setSelectUri(selectedUri);
            }}
            onOpen={() => fetchURIs(page)}
          />
          <Button onClick={handlePrevPage} disabled={page <= 1}>Previous</Button>
          <Button onClick={handleNextPage} disabled={page >= totalPages}>Next</Button>
          <Button onClick={handleAddURI}>Add</Button>
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
