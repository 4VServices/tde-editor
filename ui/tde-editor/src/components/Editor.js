import React, { useCallback, useEffect, useState } from 'react';
import Menu from './Menu.js';
import Template from './Template.js';
import SampleDocs from './SampleDocs.js';
import Variables from './Variables.js';
import Views from './Views.js';
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

  const handleViewChange = (viewIndex, changedView) => {
    let template = templateJSON;
    template.template.rows = template.template.rows.map((view, index) => {
      if (index === viewIndex) {
        return changedView;
      }
      return view;
    });
    setTemplateJSON({ ...template });
  };

  const handleViewDelete = (viewIndex) => {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      let template = templateJSON;
      template.template.rows = template.template.rows.filter((view, index) => {
        return index !== viewIndex;
      });
      setTemplateJSON({ ...template });
    }
  };

  const handleVarDelete = (varIndex) => {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      console.log(`Deleting variable with index ${varIndex}`);
      let template = templateJSON;
      template.template.vars = template.template.vars.filter((currVar, index) => {
        return index !== varIndex;
      });
      setTemplateJSON({ ...template });
    }
  };

  const handleVarAdd = () => {
    let template = templateJSON;
    template.template.vars = [...template.template.vars, { name: '', val: '' }];
    setTemplateJSON({ ...template });
  };

  const handleVarMove = (index, direction) => {
    let variables = templateJSON.template.vars;

    // direction < 0 means we're moving a variable up (earlier in the array); direction > 0 means we're moving a
    // variable down (later in the array). Moving `index` later is the same as moving `index + 1` earlier.
    let targetIndex = index;
    if (direction > 0) {
      targetIndex++;
    }

    templateJSON.template.vars = variables
      .slice(0, targetIndex - 1)
      .concat(variables[targetIndex])
      .concat(variables[targetIndex - 1])
      .concat(variables.slice(targetIndex + 1));

    setTemplateJSON({ ...templateJSON });
  };

  const handleViewAdd = () => {
    let template = templateJSON;
    template.template.rows = [...template.template.rows, { viewLayout: 'sparse' }];
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
      if (result.valid) {
        notification.success({
          message: 'Insert',
          description: 'Insert succeeded'
        });
      } else {
        setLoaded(true);
        setError(result.message);
      }
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
      <div className="left menu">
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
          />
          <SampleDocs
            uris={sampleURIs}
            addURI={addURI}
            authHeaders={buildAuthHeaders()}
            contentDB={selectedContentDb}
          />
          <Variables
            variables={templateJSON.template.vars}
            onVarDelete={handleVarDelete}
            onVarAdd={handleVarAdd}
            onVarMove={handleVarMove}
          />
          <Views
            viewsSpec={templateJSON.template.rows}
            extractedData={extractedData}
            onViewChange={handleViewChange}
            onViewDelete={handleViewDelete}
            onViewAdd={handleViewAdd}
          />
          <Triples triplesSpec={templateJSON.template.triples} extractedData={extractedData} />
        </FlexBox>
      </div>
    </FlexBox>
  );
};

export default Editor;
