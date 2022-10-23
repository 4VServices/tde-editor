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
        let result = { success: true };
        try {
          result.extracted = tde.nodeDataExtract(docs, [template]);
        } catch (ex) {
          if (ex.name === 'TDE-EVALFAILED') {
            // While I'd rather return a 400, doing so prevents a response body.
            result.success = false;
            result.error = { message: ex.data.join('; ') };
          } else {
            xdmp.rethrow();
          }
        }
        return result;
      } else {
        return {
          success: false,
          error: validTemplate
        };
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
