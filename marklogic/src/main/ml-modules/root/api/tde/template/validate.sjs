const tde = require("/MarkLogic/tde.xqy");
function validateTemplate(body) {
  let template = xdmp.toJSON(body)
  return tde.validate([template])
};
validateTemplate(xdmp.getRequestBody())