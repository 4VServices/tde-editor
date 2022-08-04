const uri = xdmp.getRequestField('uri');
const contentDB = xdmp.getRequestField('contentDB');

function getDoc(uri) {
  if (uri !== undefined && uri !== null && !fn.empty(uri)) {
    if (fn.docAvailable(uri)) {
      return cts.doc(uri);
    } else {
      fn.error(
        xs.QName('ERROR'),
        'API-SRVEXERR',
        Sequence.from([400, 'MISSING-DOCUMENT', 'Document not found with the uri: ' + uri])
      );
    }
  } else {
    fn.error(
      xs.QName('ERROR'),
      'API-SRVEXERR',
      Sequence.from([400, 'MISSING-PARAMETER', '"uri" is a required parameter'])
    );
  }
}

if (contentDB != xdmp.databaseName(xdmp.database())) {
  xdmp.invokeFunction(
    () => {
      return getDoc(uri);
    },
    {
      database: xdmp.database(contentDB)
    }
  );
} else {
  getDoc(uri);
}
