const tde = require('/MarkLogic/tde.xqy');
const template = xdmp.getRequestBody();
const uris = xdmp.getRequestField('uri');
const contentDB = xdmp.getRequestField('contentDB');

function extract(uris, template) {
  if (uris !== undefined && uris !== null) {
    if (!Array.isArray(uris)) {
      uris = [uris];
    }
    docs = uris.map((uri) => {
      if (fn.docAvailable(uri)) {
        return cts.doc(uri);
      } else {
        xdmp.setResponseCode(400, `MISSING DOCUMENT: ${uri}`);
      }
    });
    if (template !== undefined && template !== null && !fn.empty(template)) {
      let validTemplate = xdmp.toJSON(tde.validate([template])).toObject();
      if (validTemplate.valid === true) {
        return tde.nodeDataExtract(docs, [template]);
      } else {
        xdmp.setResponseCode(400, 'Bad Request');
      }
    } else {
      xdmp.setResponseCode(400, 'MISSING-BODY');
    }
  } else {
    xdmp.setResponseCode(400, 'MISSING URI PARAMETER');
  }
}

if (contentDB === xdmp.databaseName(xdmp.database())) {
  extract(uris, template);
} else {
  xdmp.invokeFunction(() => extract(uris, template), { database: xdmp.database(contentDB) });
}
