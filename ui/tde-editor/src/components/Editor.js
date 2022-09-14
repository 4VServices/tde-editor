import React, { useCallback, useEffect, useState } from 'react';
import Menu from './Menu.js';
import Template from './Template.js';
import SampleDocs from './SampleDocs.js';
import Variables from './Variables.js';
import ViewRows from './ViewRows.js';
import Triples from './Triples.js';
import { getDatabases } from '../apis/databases';
import { buildAuthHeaders } from '../apis/buildAuthHeader';
import { getTemplate, getTemplates, templateExtract, templateInsert, templateValidate } from '../apis/templates';
import { FlexBox } from './Box';
import { notification } from 'antd';

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
  const [sampleURIs, setSampleURIs] = useState([]);
  const [extractedData, setExtractedData] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState();

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

  const handleRowChange = (rowIndex, changedRow) => {
    let template = templateJSON;
    template.template.rows = template.template.rows.map((row, index) => {
      if (index === rowIndex) {
        return changedRow;
      }
      return row;
    });
    setTemplateJSON({ ...template });
  };

  const handleRowDelete = (rowIndex) => {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      let template = templateJSON;
      template.template.rows = template.template.rows.filter((row, index) => {
        return index !== rowIndex;
      });
      setTemplateJSON({ ...template });
    }
  };

  const handleAddRow = () => {
    let template = templateJSON;
    template.template.rows = [...template.template.rows, {}];
    setTemplateJSON({ ...template });
  };

  const handleValidate = async () => {
    try {
      const result = await templateValidate(templateJSON);
      console.log(`This template ${result.valid ? 'is' : 'is not'} valid`);
      let body = `This template ${result.valid ? 'is' : 'is not'} valid`;
      if (!result.valid) {
        body += '\n' + result.message;
        notification.error({
          message: 'Validation',
          description: body
        });
      } else {
        notification.success({
          message: 'Validation',
          description: body
        });
      }
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
        setExtractedData(result);

        notification.success({
          message: 'Extraction',
          description: 'Extraction succeeded'
        });
      } catch (error) {
        console.log(`extraction call failed: ${error}`);
        setLoaded(true);
        setError(error);
        setExtractedData(null);
      }
    } else {
      notification.warn({
        message: 'Extraction',
        description: 'Add the URI of at least one sample document before running extract'
      });
    }
  };

  const handleTemplateInsert = async () => {
    try {
      const result = await templateInsert(selectedTemplateURI, templateJSON);
      notification.success({
        message: 'Insert',
        description: 'Insert succeeded'
      });
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
    <FlexBox width="100%" alignItems="flex-start" margin="2rem 0" gap="4rem" flexWrap="nowrap">
      <div className="left">
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
      </div>
      <div className="right">
        <FlexBox alignItems="stretch" flexDirection="column" gap="2rem">
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
          <SampleDocs
            uris={sampleURIs}
            addURI={addURI}
            authHeaders={buildAuthHeaders()}
            contentDB={selectedContentDb}
          />
          <Variables />
          <ViewRows
            rowsSpec={templateJSON.template.rows}
            extractedData={extractedData}
            onRowChange={handleRowChange}
            onRowDelete={handleRowDelete}
            onAddRow={handleAddRow}
          />
          <Triples rowsSpec={templateJSON.template.rows} extractedData={extractedData} />
        </FlexBox>
      </div>
    </FlexBox>
  );
};

export default Editor;
