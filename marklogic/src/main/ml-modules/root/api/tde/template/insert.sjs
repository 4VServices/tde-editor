const tde = require("/MarkLogic/tde.xqy");
function insertTemplate(body,uri) {
  let template = xdmp.toJSON(body)
  return tde.templateInsert(uri,template) 
};
insertTemplate(xdmp.getRequestBody(),xdmp.getRequestField("uri"))