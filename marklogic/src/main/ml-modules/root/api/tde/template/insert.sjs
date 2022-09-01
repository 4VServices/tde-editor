const tde = require('/MarkLogic/tde.xqy');

const requestMethod = xdmp.getRequestMethod();

if (requestMethod === 'POST') {
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

  result;
} else {
  xdmp.setResponseCode(405, 'Method Not Allowed');
}
