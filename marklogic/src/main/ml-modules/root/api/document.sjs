const runModule = require('/lib/helpers/runModule.sjs');
const errorResponse = require('/lib/helpers/errorResponse.sjs');

function getDocument() {
  const uri = xdmp.getRequestField('uri');
  const contentDB = xdmp.getRequestField('contentDB');

  const getDoc = (uri) => {
    if (uri !== undefined && uri !== null && !fn.empty(uri)) {
      if (fn.docAvailable(uri)) {
        return cts.doc(uri);
      }
      return errorResponse(400, 'Missing Document', `No document found with the uri: ${uri}`);
    }
    return errorResponse(400, 'Missing Parameter', '"uri" is a required parameter');
  };

  if (contentDB != xdmp.databaseName(xdmp.database())) {
    return xdmp.invokeFunction(
      () => {
        return getDoc(uri);
      },
      {
        database: xdmp.database(contentDB)
      }
    );
  }
  return getDoc(uri);
}

runModule(getDocument, {
  allowedMethods: 'get',
  protected: true
});
