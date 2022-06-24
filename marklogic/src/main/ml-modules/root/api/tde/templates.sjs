'use strict';

function listTemplates(contentDBId) {
  return {
    templates: xdmp.invokeFunction(
      function () {
        return (
          fn
            .collection('http://marklogic.com/xdmp/tde')
            .toArray()
            // We're only supporting JSON templates for now
            .filter((tdeDoc) => tdeDoc.root.nodeType === Node.OBJECT_NODE)
            .map((tdeDoc) => {
              let enabled = xdmp.toJSON(tdeDoc).toObject().template.enabled;
              return {
                uri: tdeDoc.baseURI,
                enabled: enabled === undefined ? true : enabled,
              };
            })
        );
      },
      { database: xdmp.schemaDatabase(contentDBId) }
    ),
  };
}

function getDatabaseId(dbName) {
  try {
    return xdmp.database(dbName);
  } catch (e) {
    fn.error(xs.QName('INVALID-DATABASE'), `${dbName} is not the name of a database in this MarkLogic instance`);
  }
}

const contentDB = xdmp.getRequestField('contentDB');
if (contentDB !== undefined && contentDB !== null && !fn.empty(contentDB)) {
  listTemplates(getDatabaseId(contentDB));
} else {
  fn.error(
    xs.QName('ERROR'),
    'API-SRVEXERR',
    Sequence.from([400, 'MISSING-PARAMETER', '"contentDB" is a required parameter'])
  );
}
