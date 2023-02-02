const tde = require('/MarkLogic/tde.xqy');

const runModule = require('/lib/helpers/runModule.sjs');

function insertTemplate() {
  const template = xdmp.getRequestBody();
  const validation = tde.validate([template]);
  let result = null;

  if (validation.valid === true) {
    tde.templateInsert(xdmp.getRequestField('uri'), xdmp.toJSON(template));
    result = {
      valid: true
    };
  } else {
    // Return the error
    result = validation;
  }

  return result;
}

runModule(insertTemplate, {
  protected: true,
  allowedMethods: 'post'
});