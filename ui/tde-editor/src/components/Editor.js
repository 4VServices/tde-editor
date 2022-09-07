import React, { useEffect, useState } from 'react';
import './ExtractedRows.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import Menu from './Menu.js';
import Template from './Template.js';
import SampleDocs from './SampleDocs.js';
import Variables from './Variables.js';
import ViewRows from './ViewRows.js';
import Triples from './Triples.js';
import { getDatabases } from '../apis/databases';
import { buildAuthHeaders } from '../apis/buildAuthHeader';
import { getTemplate, getTemplates, templateExtract, templateInsert, templateValidate } from '../apis/templates';

function defaultTemplate() {
  return {
    template: {
      context: '',
      collections: []
    }
  };
}

const Editor = (props) => {
  const [contentDBs, setContentDBs] = useState([]);
  const [selectedContentDb, setSelectedContentDb] = useState('select');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateURI, setSelectedTemplateURI] = useState('');
  const [templateJSON, setTemplateJSON] = useState(defaultTemplate());
  const [msgHeader, setMsgHeader] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [sampleURIs, setSampleURIs] = useState([]);
  const [extractedData, setExtractedData] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState();

  const toggleShowNotification = () => {
    setShowNotification((notification) => !notification);
  };

  const handleContentDbChange = async (dbName) => {
    setSelectedContentDb(dbName);
    const data = await getTemplates(dbName).catch((error) => {
      console.log(`templates call failed: ${error}`);
      setLoaded(true);
      setError(error);
    });
    setLoaded(true);
    setTemplates(data.templates);
  };

  const handleTemplateChange = async (templateURI) => {
    setSelectedTemplateURI(templateURI);
    const data = await getTemplate(selectedContentDb, templateURI).catch((error) => {
      console.log(`templates call failed: ${error}`);
      setLoaded(true);
      setError(error);
    });
    setLoaded(true);
    setTemplateJSON(data);
  };

  const handleURIChange = (templateURI) => {
    setSelectedTemplateURI(templateURI);
  };

  const addURI = (contentURI) => {
    setSampleURIs(sampleURIs.concat(contentURI));
  };

  const handleDescriptionChange = (description) => {
    let template = templateJSON;
    template.template.description = description;
    setTemplateJSON(template);
  };

  const handleContextChange = (context) => {
    let template = templateJSON;
    template.template.context = context;
    setTemplateJSON(template);
  };

  const handleCollectionChange = (collection) => {
    let template = templateJSON;
    template.template.collections = [collection];
    setTemplateJSON(template);
  };

  const handleRowChange = (changedIndex, property, value) => {
    let template = templateJSON;
    template.template.rows.map((row, index) => {
      if (index === changedIndex) {
        row[property] = value;
      }
      return row;
    });
  };

  const handleValidate = async () => {
    try {
      const result = await templateValidate(templateJSON);
      console.log(`This template ${result.valid ? 'is' : 'is not'} valid`);
      let body = `This template ${result.valid ? 'is' : 'is not'} valid`;
      if (!result.valid) {
        body += '\n' + result.message;
      }
      setMsgHeader('Validation');
      setMsgBody(body);
      setShowNotification(true);
    } catch (error) {
      console.log(`validation call failed: ${error}`);
      setLoaded(true);
      setError(error);
    }
  };

  const handleTemplateExtract = async () => {
    if (sampleURIs.length > 0) {
      console.log('Editor.js; handleTemplateExtract');
      let uriParam = sampleURIs.map((uri) => `uri=${uri}`).join('&');
      try {
        const result = await templateExtract(uriParam, selectedContentDb, templateJSON);
        setMsgHeader('Extraction');
        setMsgBody('Extraction succeeded');
        setShowNotification(true);
        setExtractedData(result);
      } catch (error) {
        console.log(`extraction call failed: ${error}`);
        setLoaded(true);
        setError(error);
        setExtractedData(null);
      }
    } else {
      setMsgHeader('Extraction');
      setMsgBody('Add the URI of at least one sample document before running extract');
      setShowNotification(true);
    }
  };

  const handleTemplateInsert = async () => {
    try {
      const result = await templateInsert(selectedTemplateURI, templateJSON);
      setMsgHeader('Insert');
      setMsgBody('Insert succeeded');
      setShowNotification(true);
    } catch (error) {
      console.log(`insert call failed: ${error}`);
      setLoaded(true);
      setError(error);
    }
  };

  useEffect(() => {
    const fn = async () => {
      const data = await getDatabases().catch((error) => {
        console.log(`databases call failed: ${error}`);
        setLoaded(true);
        setError(error);
      });
      setLoaded(true);
      setContentDBs(data);
    };

    fn();
  }, []);

  return (
    <Row>
      <Col md="auto">
        <Menu
          contentDBs={contentDBs}
          onContentDbSelected={handleContentDbChange}
          selectedContentDb={selectedContentDb}
          templates={templates}
          onTemplateSelected={handleTemplateChange}
          onTemplateExtract={handleTemplateExtract}
          onTemplateInsert={handleTemplateInsert}
          selectedTemplateURI={selectedTemplateURI}
          handleValidate={handleValidate}
        ></Menu>
        <Toast show={showNotification} onClose={toggleShowNotification}>
          <Toast.Header>
            <strong className="me-auto">{msgHeader}</strong>
          </Toast.Header>
          <Toast.Body>{msgBody}</Toast.Body>
        </Toast>
      </Col>
      <Col>
        <Row>
          <Template
            templateURI={selectedTemplateURI}
            context={templateJSON.template.context}
            collection={templateJSON.template.collections}
            description={templateJSON.template.description}
            handleURIChange={handleURIChange}
            handleDescriptionChange={handleDescriptionChange}
            handleContextChange={handleContextChange}
            handleCollectionChange={handleCollectionChange}
            handleRowChange={handleRowChange}
          />
        </Row>
        <Row>
          <SampleDocs
            uris={sampleURIs}
            addURI={addURI}
            authHeaders={buildAuthHeaders()}
            contentDB={selectedContentDb}
          />
        </Row>
        <Row>
          <Variables />
        </Row>
        <Row>
          <ViewRows rowsSpec={templateJSON.template.rows} extractedData={extractedData} />
        </Row>
        <Row>
          <Triples rowsSpec={templateJSON.template.rows} extractedData={extractedData} />
        </Row>
      </Col>
    </Row>
  );
};

export default Editor;
